import { defineLive } from "next-sanity/live";
import { client } from './client'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

const liveClient = client ?? createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
})

export const { sanityFetch, SanityLive } = defineLive({
  client: liveClient,
});
