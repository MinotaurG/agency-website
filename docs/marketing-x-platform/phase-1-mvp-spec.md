# AI-Powered Target Audience Activation Platform — Phase 1 (MVP) Spec

> Internal technical hand-off. This platform is a **separate product** from the Elevate Strategy website and should live in its own repository. This document covers the Phase 1 (MVP) architecture, dependency list, and build order derived from the client PRD (pages 19-25, "Confidential - Product Requirement & System Architecture").

## MVP scope

The narrowest slice that proves the core promise:

> Upload your own data, AI-clean it, build an audience, run a WhatsApp + Email campaign with approval, capture and score the responses, convert in a light CRM, and see it on a dashboard.

**Explicitly out of Phase 1:** the data marketplace, conversational AI voice calling, and the Meta / Google / SMS / IVR channels. Those are Phase 2 and Phase 3.

## Difficulty note

The full PRD is effectively three products in one: a Customer Data Platform, a multi-channel campaign manager and CRM, and an AI voice-calling product, plus a data marketplace. Full scope is a 12 to 24 month build for a dedicated multi-person team. Phasing exists so value and revenue arrive long before that.

## System diagram

```
┌─────────────────────────────────────────────────────────────┐
│  Web App  (Next.js App Router + Supabase Auth)               │
│  Client portal · Admin portal · Dashboards (Recharts)        │
└───────────────┬─────────────────────────────────────────────┘
                │ (server actions / API routes, Zod-validated)
┌───────────────▼─────────────────────────────────────────────┐
│  Core Services (Next.js server + Supabase Postgres w/ RLS)   │
│  Org · Users/RBAC · Audience · Campaign · Approvals · CRM    │
│  Consent/Suppression ledger · Audit log · Data lineage       │
└───┬───────────────┬───────────────┬──────────────────┬───────┘
    │               │               │                  │
┌───▼─────┐   ┌─────▼──────┐  ┌─────▼───────┐   ┌───────▼──────┐
│ Data    │   │ AI Orch.   │  │ Campaign    │   │ Response Hub │
│ Pipeline│   │ Layer      │  │ Orch.       │   │ (webhooks)   │
│         │   │            │  │             │   │              │
│ Upload  │   │ LiteLLM →  │  │ Temporal    │   │ WhatsApp in  │
│ Validate│   │  Claude    │  │ workflows:  │   │ Email events │
│ Dedup   │   │ pgvector   │  │  sequence,  │   │ Form leads   │
│ (Splink)│   │ Langfuse   │  │  retries,   │   │ → intent +   │
│ GE      │   │ guardrails │  │  approvals  │   │   lead score │
└─────────┘   └────────────┘  └──────┬──────┘   └──────────────┘
                                      │
                          ┌───────────▼───────────┐
                          │ Channel adapters       │
                          │  WhatsApp (Meta Cloud) │
                          │  Email (Resend)        │
                          └────────────────────────┘

Cross-cutting: Upstash Redis (queue/cache/rate-limit) · Cloudinary (creatives)
               ClamAV (upload scan) · OpenTelemetry (traces)
```

## Components by layer and concrete dependencies

### 1. Web app and auth
- **Next.js 16 (App Router)** + **Supabase Auth** (already in the team's stack).
- Route groups: `(client)`, `(admin)`. RBAC gate in middleware.
- Dashboards: **Recharts**.

### 2. Core data and multi-tenancy (load-bearing)
- **Supabase Postgres** with **Row-Level Security** keyed on `org_id` for tenant isolation.
- Authorization: **Casbin** (`casbin` npm) for the 12-role RBAC. Move to **SpiceDB** only if field-level or relationship permissions become a requirement.
- **Audit log**, **consent/suppression ledger**, and **data-lineage** columns are built in Phase 1, not later. Retrofitting them is the expensive mistake.

### 3. Data pipeline (upload and prep)
- CSV/XLSX parsing: **`papaparse`** + **SheetJS (`xlsx`)**.
- Virus scan: **ClamAV** via a small worker (`clamscan` npm binding).
- Data quality checks: **Great Expectations** (Python worker) or lighter **Zod**-based per-column rules for MVP.
- Dedup / merge: **Splink** (MIT, Python) as a worker service. If too heavy for MVP, start with deterministic dedup on normalized phone/email and add Splink in Phase 2.
- Heavy jobs run as **Upstash Redis + BullMQ** workers.

### 4. AI orchestration layer
- Gateway: **LiteLLM** (MIT) in front of the **Claude API** (latest Opus/Sonnet models). One integration point, easy model swaps.
- RAG / structured extraction: **LlamaIndex** or direct SDK calls (MVP may not need a framework).
- Vector store: **pgvector** on Supabase (no new infra).
- Guardrails: **NeMo Guardrails** or prompt-level constraints for MVP.
- Observability, prompt logging, and eval: **Langfuse** (MIT). Satisfies the PRD requirement for prompt logging and model-output auditability.
- MVP AI services only: **Audience Briefing**, **Content Studio** (WhatsApp/email copy), **Report Generator**.

### 5. Campaign orchestration
- **Temporal** (MIT): durable workflows for campaign sequence, retries, and multi-stage approval gates. Highest-value single dependency in this layer.
- Approval Center is a Temporal workflow with human-signal steps plus Postgres state.

### 6. Channels (2 only in MVP)
- **WhatsApp:** Meta **Cloud API** directly, or a BSP. Requires WABA onboarding and approved templates. Start the paperwork early; it has lead time.
- **Email:** **Resend** for sends; store delivery/open/click webhooks.

### 7. Unified Response Hub and CRM
- Ingest webhooks (WhatsApp replies, email events, form leads) into a normalized `responses` table with a conversation timeline.
- AI classifies intent and scores leads via the LiteLLM to Claude path.
- Light CRM: rule-based routing plus stages, built custom on Postgres. A full CRM (Twenty, Chatwoot) is Phase 2; avoid the AGPL dependency this early.

### 8. Reporting
- In-app dashboards with **Recharts**.
- **Apache Superset** (Apache 2.0) only if clients need self-serve BI; otherwise defer.

### 9. Cross-cutting
- Rate limiting: **Upstash**.
- Creatives/media: **Cloudinary**.
- Tracing/metrics: **OpenTelemetry** plus Langfuse for AI.

## Key data model (Phase 1 tables)

```
organizations, users, roles, memberships
datasets, dataset_rows, dataset_lineage
consent_records, suppression_list
audiences, audience_versions (locked), audience_filters
campaigns, campaign_channels, creatives, approvals, audit_events
sends (per recipient/channel), delivery_events
responses, conversations, leads, lead_scores, lead_stages
ai_outputs (prompt, model/version, confidence, review_status)
```

Two rules from the PRD to enforce at the schema level from day one:
- Every campaign references a **locked** `audience_version` (immutable snapshot).
- Every `ai_output` retains source references, model/version, and review status.

## Licensing

No AGPL or source-available dependency in the Phase 1 core. All safe for commercial SaaS:

| Dependency | License |
|---|---|
| Supabase | Apache 2.0 |
| Temporal | MIT |
| LiteLLM | MIT |
| Casbin | Apache 2.0 |
| pgvector | PostgreSQL license |
| Langfuse | MIT |
| Splink | MIT |
| Great Expectations | Apache 2.0 |
| Apache Superset | Apache 2.0 |
| ClamAV | GPL (run as an isolated service, no linking concern) |

Buckets to keep in mind as the product grows:
- **Safe (MIT / Apache / BSD):** default to these.
- **AGPL (Listmonk, Metabase OSS, Grafana, Twenty):** fine to run unmodified; modifying and offering as a service can trigger source disclosure. Review before it becomes core.
- **SSPL / BSL / Elastic License (MongoDB, Redpanda):** restrict offering as a managed service. Avoid for core infrastructure.

## Build order

1. **Phase 0 spine:** multi-tenant schema, RLS, RBAC, audit, consent/suppression ledger.
2. **Upload to audience:** ingestion, validation, dedup, Audience Studio with locking.
3. **Campaign and approval:** Campaign Studio, Temporal approval workflow.
4. **Channels:** Email (Resend) first, then WhatsApp (gated on WABA approval).
5. **Response Hub, CRM, scoring:** webhooks, intent/scoring, routing, stages.
6. **AI services and dashboards:** briefing, content, report generator, dashboards.

Start the **WhatsApp WABA** and, if the target geography is India, the **SMS DLT** registrations in parallel with step 1. The approvals, not the code, are the long pole.

## Open questions to resolve before build

1. Is "Marketing X" the client's own product, or a spec handed to Elevate Strategy to build or quote?
2. Does licensed data inventory for the marketplace exist yet? If not, the upload-only path is the real starting point regardless.
3. Is AI voice calling a must-have or a headline feature? If the latter, it can be a Phase 3 promise.
4. Target geography (likely India, given WhatsApp WABA and SMS DLT signals) drives the compliance layer design.
