// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'D:/Courses/CSC4001/Project/CSC4001-Better-SIS/src/frontend/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
