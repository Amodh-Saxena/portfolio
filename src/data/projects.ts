import {
  Activity,
  Camera,
  Check,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Monitor,
  Package,
  RotateCcw,
  Salad,
  ScanLine,
  Server,
  Split,
} from 'lucide-react'
import type { Project } from './types'
import { todo } from './types'

/**
 * PRD §5.4 — Featured projects as case studies.
 * Everything not in the brief is a `todo(...)` placeholder. Do not add metrics,
 * datasets, thresholds or results unless verified for public display.
 * `links` stay `null` until a real URL exists — icons are hidden when null.
 */
export const projects: Project[] = [
  {
    id: 'food-detection',
    title: 'Food Detection & Nutrition Analysis System',
    summary: 'AI-powered food classification and nutritional information.',
    tags: ['React', 'TensorFlow', 'MobileNet', 'API integrations'],
    problem:
      'Knowing what is on a plate — and what it contains nutritionally — usually means manual searching and estimating, which is slow and easy to get wrong.',
    solution:
      'A React application that identifies food from an uploaded photo or camera capture using a MobileNet-based TensorFlow classifier, then looks up nutritional information through an external API and presents it alongside the prediction.',
    architecture: {
      kind: 'pipeline',
      summary:
        'An image from upload or camera is preprocessed, classified by MobileNet, the predicted label is used to query a nutrition API, and the results view shows label, confidence and nutrition breakdown.',
      nodes: [
        { label: 'Image input', detail: 'Upload or camera', icon: Camera },
        { label: 'Preprocessing', detail: 'Resize & normalize', icon: ScanLine },
        { label: 'MobileNet', detail: 'Classification', icon: Cpu },
        { label: 'Nutrition API', detail: 'Lookup by label', icon: Salad },
        { label: 'Results view', detail: 'Label · confidence · nutrition', icon: Monitor },
      ],
    },
    stack: ['React', 'TensorFlow', 'MobileNet', 'API integrations'],
    implementation: [
      'Image input from file upload or the device camera, handled in the React client.',
      "Preprocessing step that prepares each image for the model's expected input before inference.",
      'MobileNet — a lightweight convolutional network suited to fast inference — classifies the image and returns a label with a confidence score.',
      'The predicted label drives a nutrition API lookup; the results view shows the label, confidence and nutrition breakdown together.',
      todo('Training dataset and number of food classes'),
      todo('Where inference runs (in-browser TensorFlow.js vs. server) and the nutrition API provider'),
    ],
    links: { github: null, demo: null },
    pending: ['Dataset', 'Model accuracy / evaluation', 'Nutrition API provider', 'Repo & demo links'],
  },
  {
    id: 'canaryml',
    title: 'CanaryML',
    summary:
      'Progressive ML model deployment with gradual traffic shifting and automated monitoring.',
    tags: ['Kubernetes', 'Argo Rollouts', 'Prometheus', 'Helm'],
    problem:
      'Shipping a new ML model to everyone at once risks degraded accuracy, higher latency, or errors reaching all users before anyone notices.',
    solution:
      'CanaryML rolls out new model versions progressively. Argo Rollouts shifts a growing share of traffic to the canary in steps while Prometheus metrics are analysed; the new version is promoted only if it stays healthy, and is rolled back automatically if it does not.',
    architecture: {
      kind: 'canary',
      summary:
        'A new model version is deployed as an Argo Rollouts canary with stepwise traffic weights. Prometheus collects metrics, an analysis gate checks accuracy, latency and error rate, and the rollout is either promoted or automatically rolled back.',
      nodes: [
        { label: 'New model version', detail: 'Helm-packaged release', icon: Package },
        { label: 'Argo Rollout canary', detail: 'Stepwise traffic weight', icon: Split },
        { label: 'Prometheus', detail: 'Metrics collection', icon: Activity },
        { label: 'Analysis gate', detail: 'Accuracy · latency · error rate', icon: GitBranch },
      ],
      outcomes: [
        { label: 'Promote', detail: 'Canary becomes stable', icon: Check },
        { label: 'Auto-rollback', detail: 'Revert to previous version', icon: RotateCcw },
      ],
    },
    stack: ['Kubernetes', 'Argo Rollouts', 'Prometheus', 'Helm'],
    implementation: [
      'Deployment packaged with Helm so model releases are versioned and repeatable.',
      'Argo Rollouts canary strategy shifts traffic to the new model gradually, step by step, instead of all at once.',
      'Prometheus monitors accuracy, latency and error rate for the canary during each step.',
      'An analysis gate decides between promoting the new version and automatically rolling back.',
      todo('Analysis thresholds and test results — shown only once confirmed for public display'),
    ],
    links: { github: null, demo: null },
    pending: ['Thresholds', 'Test results', 'Repo & demo links'],
  },
  {
    id: 'healthcare-platform',
    title: 'Healthcare Management Platform',
    summary: 'Healthcare-oriented application built with Spring Boot and database technologies.',
    tags: ['Spring Boot', 'REST APIs', 'SQL'],
    problem: todo('Problem statement — describe the healthcare workflow this platform addresses'),
    solution:
      'A healthcare-oriented application with a Spring Boot backend that exposes REST APIs over a relational database, organised as a layered architecture.',
    architecture: {
      kind: 'layered',
      summary:
        'A client calls a Spring Boot REST API, which delegates to a service layer that reads and writes a relational database. Generic layered view; modules to be confirmed.',
      nodes: [
        { label: 'Client', detail: 'Consumes the REST API', icon: Monitor },
        { label: 'REST API', detail: 'Spring Boot controllers', icon: Server },
        { label: 'Service layer', detail: 'Business logic', icon: Layers },
        { label: 'Database', detail: 'MySQL / PostgreSQL — TODO: confirm', icon: Database },
      ],
    },
    stack: ['Spring Boot', 'REST APIs', 'MySQL / PostgreSQL (TODO: confirm which)'],
    implementation: [
      'REST endpoints implemented with Spring Boot.',
      'Service layer separates business logic from the API layer.',
      todo('Database choice: MySQL or PostgreSQL'),
      todo('Features, user roles and schema details'),
    ],
    links: { github: null, demo: null },
    pending: ['Problem statement', 'Database choice', 'Features, roles & schema', 'Repo & demo links'],
  },
]
