export interface PlayingCardData {
  id: string;
  letter: string;
  index: number;
  title: string;
  subtitle: string;
  formula: string;
  description: string;
  systemConcept: string;
  diagramType: string;
  defaultRotation: number; // in degrees for fanned spread
  defaultXOffset: number; // horizontal displacement in px
  defaultYOffset: number; // vertical displacement in px
}

export const IMAPCODE_CARDS: PlayingCardData[] = [
  {
    id: 'card-i',
    letter: 'I',
    index: 0,
    title: 'Interface & Optics',
    subtitle: "Snell's Refraction & Boundary Abstraction",
    formula: 'n₁ sin(θ₁) = n₂ sin(θ₂)',
    description: 'Clean optical interfaces, deterministic state reflections, and ray-traced spatial precision across client viewports.',
    systemConcept: 'Zero-latency UI event loop, accessible DOM hierarchy, and fluid reactive layout math.',
    diagramType: 'optics-refraction',
    defaultRotation: -26,
    defaultXOffset: -290,
    defaultYOffset: 24,
  },
  {
    id: 'card-m',
    letter: 'M',
    index: 1,
    title: 'Mathematical Foundations',
    subtitle: 'Gradient Dynamics & Flux Conservation',
    formula: '∂Δ/∂t = -∇ · J + σ',
    description: 'Vector calculus, gradient convergence, and zero-copy serialization mathematics governing system state flows.',
    systemConcept: 'Ring-buffer memory indexing, write-ahead logs, and monotonic timestamp synchronizers.',
    diagramType: 'vector-calculus',
    defaultRotation: -19,
    defaultXOffset: -210,
    defaultYOffset: 10,
  },
  {
    id: 'card-a',
    letter: 'A',
    index: 2,
    title: 'Atomic Architecture',
    subtitle: 'C₆₀ Geodesic Cage & Decoupled Meshes',
    formula: 'V - E + F = 2 (Euler characteristic)',
    description: 'Buckminsterfullerene molecular symmetry: structurally immutable, self-supporting nodes resilient under stress.',
    systemConcept: 'Fault-isolated micro-clusters, immutable container deployments, and zero single-point-of-failure routing.',
    diagramType: 'buckyball-cage',
    defaultRotation: -12,
    defaultXOffset: -130,
    defaultYOffset: 2,
  },
  {
    id: 'card-p',
    letter: 'P',
    index: 3,
    title: 'Performance & Quantum State',
    subtitle: 'Hamiltonian Bound & Latency Eigenvalues',
    formula: 'Ĥ |Ψ⟩ = E |Ψ⟩,  ∂/∂Hᵢ',
    description: 'Bound states in energy potential wells, minimizing latency variance to deliver razor-sharp p99 response times.',
    systemConcept: 'Sub-millisecond API responses, SIMD vectorization, and CPU cache-line alignment optimizations.',
    diagramType: 'quantum-wave',
    defaultRotation: -5,
    defaultXOffset: -50,
    defaultYOffset: -2,
  },
  {
    id: 'card-c',
    letter: 'C',
    index: 4,
    title: 'Control Theory',
    subtitle: 'Closed-Loop Feedback & Transfer Functions',
    formula: 'H(s) = Y(s) / U(s),  L(v)',
    description: 'Classical feedback control, Laplace transforms, and continuous closed-loop telemetry stabilizing distributed load.',
    systemConcept: 'Adaptive PID rate limiters, automated circuit breakers, and dynamic backpressure backoff.',
    diagramType: 'control-loop',
    defaultRotation: 2,
    defaultXOffset: 30,
    defaultYOffset: -2,
  },
  {
    id: 'card-o',
    letter: 'O',
    index: 5,
    title: 'Operational Logic',
    subtitle: 'Silicon Gates & Instruction Primitives',
    formula: 'f(A, B) = A · B ⊕ { ... }',
    description: 'Direct silicon primitives, Boolean algebraic pipelines, and assembly-level CPU instruction optimizations.',
    systemConcept: 'Kernel epoll event demultiplexing, lock-free queues, and bitwise flags for high-throughput throughput.',
    diagramType: 'logic-circuit',
    defaultRotation: 9,
    defaultXOffset: 110,
    defaultYOffset: 2,
  },
  {
    id: 'card-d',
    letter: 'D',
    index: 6,
    title: 'Distributed Consensus',
    subtitle: 'Particle Scattering & Gossip Vectors',
    formula: 'S_fi = ⟨ψ_f | Ŝ | ψ_i⟩',
    description: 'High-energy particle track interactions: deterministic collisions, gossip protocol propagation, and quorum voting.',
    systemConcept: 'Raft consensus logs, vector clocks, and partitioned mesh networking with split-brain prevention.',
    diagramType: 'particle-collision',
    defaultRotation: 16,
    defaultXOffset: 190,
    defaultYOffset: 10,
  },
  {
    id: 'card-e',
    letter: 'E',
    index: 7,
    title: 'Root Execution / The Ace of Spades',
    subtitle: '4D Tesseract Projection & Bragg Lattice',
    formula: '2d sin(θ) = nλ  |  SUDO ACCESS',
    description: 'The crowning card: ornate Ace of Spades emblem, 4-dimensional hypercube projection, and crystal diffraction grating.',
    systemConcept: 'Root administrator privilege, distributed orchestration supremacy, and uncompromised architectural craft.',
    diagramType: 'ace-of-spades-hypercube',
    defaultRotation: 24,
    defaultXOffset: 270,
    defaultYOffset: 24,
  },
];
