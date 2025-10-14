// sanity core
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation' 
// plugins
import {singletonTools} from 'sanity-plugin-singleton-tools'
// import {documentInternationalization} from '@sanity/document-internationalization'
// studio
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import Logo from './components/icons/Logo'


export const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
export const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
  name: 'pit',
  title: 'Pit',
  projectId,
  dataset,
  icon: Logo,

  plugins: [
    structureTool({
      structure
    }),

    // documentInternationalization({
    //   supportedLanguages: [
    //     {id: 'it', title: 'Italian'},
    //     {id: 'en', title: 'English'}
    //   ],
    //   schemaTypes: ['page', 'project']
    // }),

    // presentationTool({
    //   previewUrl: {
    //     origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:5173',
    //     previewMode: {
    //       enable: '/preview/enable',
    //       disable: '/preview/disable',
    //     },
    //   },
    // }),

    visionTool(),
    singletonTools(),
  ],
  schema: {
    types: schemaTypes,
  },
})
