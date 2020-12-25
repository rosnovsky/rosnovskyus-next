import {
  groq,
  createClient,
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from 'next-sanity'
import serializers from "./serializers"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactPlayer from 'react-player/file';
import Youtube from 'react-player/youtube';
import Figure from './code';
import Code from './code';


const config = {
  /**
    * Find your project ID and dataset in `sanity.json` in your studio project.
    * These are considered “public”, but you can use environment variables
    * if you want differ between local dev and production.
    *
    * https://nextjs.org/docs/basic-features/environment-variables
    **/
  dataset: 'production',
  projectId: "n3o7a5dl",
  useCdn: process.env.NODE_ENV === 'production',
  /**
    * Set useCdn to `false` if your application require the freshest possible
    * data always (potentially slightly slower and a bit more expensive).
    * Authenticated request (like preview) will always bypass the CDN
    **/
}

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source: any) => createImageUrlBuilder(config).image(source)

// Set up the live preview subsscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  serializers: serializers
})

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)
// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview: any) => (usePreview ? previewClient : sanityClient)

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)
