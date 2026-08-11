export const BUILDER_TITLES = [
  { label: 'THE CURIOUS BUILDER', bestFor: 'General / students', keywords: [] },
  { label: 'THE IDEA HUNTER', bestFor: 'Product / innovation', keywords: ['product', 'founder', 'innovation', 'growth'] },
  { label: 'THE CODE EXPLORER', bestFor: 'Developers', keywords: ['developer', 'engineer', 'code'] },
  { label: 'THE AI EXPLORER', bestFor: 'AI / ML', keywords: ['ai', 'ml', 'llm', 'model', 'machine learning'] },
  { label: 'THE DATA EXPLORER', bestFor: 'Data / analytics', keywords: ['data', 'analytics', 'analyst'] },
  { label: 'THE CREATIVE CODER', bestFor: 'Frontend / design', keywords: ['frontend', 'design', 'ui', 'ux', 'creative'] },
  { label: 'THE PROBLEM SOLVER', bestFor: 'General engineering', keywords: ['engineering', 'system', 'backend'] },
  { label: 'THE QUICK PROTOTYPER', bestFor: 'Hackathon builders', keywords: ['hackathon', 'prototype', 'mvp'] },
  { label: 'THE NIGHT OWL', bestFor: 'Fun / general', keywords: ['night'] },
  { label: 'THE SHIP-IT BUILDER', bestFor: 'Full-stack / product', keywords: ['full stack', 'full-stack', 'ship'] },
]

export function getBuilderTitle(role = '', stack = '') {
  const value = `${role} ${stack}`.toLowerCase()
  return BUILDER_TITLES.find((item) => item.keywords.some((keyword) => value.includes(keyword)))?.label || 'THE CURIOUS BUILDER'
}

export function getBuilderPhrase(role = '', stack = '') {
  const value = `${role} ${stack}`.toLowerCase()
  if (/ai|ml|model|llm/.test(value)) return 'TURNS IDEAS INTO MODELS.'
  if (/design|ui|ux/.test(value)) return 'MAKES COMPLEX THINGS FEEL SIMPLE.'
  if (/founder|product|growth/.test(value)) return 'BUILDS WHAT PEOPLE NEED.'
  if (/backend|infra|system|devops/.test(value)) return 'SHIPS SYSTEMS THAT HOLD.'
  return 'BUILDS WITH CURIOSITY.'
}
