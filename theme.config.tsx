import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: <span>Dokumentace programovaní</span>,
  project: {
    link: 'https://github.com/Btihin/programovani-doc/',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/Btihin/programovani-doc/',
  footer: {
    text: 'Nextra Docs Template',
  },
};

export default config;
