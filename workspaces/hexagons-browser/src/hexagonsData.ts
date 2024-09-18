const compareByString =
  <K extends string, T extends Record<K, string>>(field: K) =>
  (a: T, b: T) =>
    a[field].localeCompare(b[field]);

export type Group = Readonly<{
  color: string;
  textColor: string;
  name: string;
  repoTopics: ReadonlyArray<string>;
}> & { hexagons?: Hexagon[] };

export type Hexagon = Readonly<{
  group: Group;
  code: string;
  name: string;
  productName: string;
  repoName: string;
  devPort?: number;
}>;

const serviceRuntimeCoreGroup: Group = {
  color: "red",
  textColor: "white",
  name: "service-runtime-core-modules",
  repoTopics: ["module", "runtime"],
};

const serviceRuntimeCoreHexagons: ReadonlyArray<Hexagon> = [
  {
    group: serviceRuntimeCoreGroup,
    code: "En",
    name: "env",
    productName: "Env Module",
    repoName: "env",
  },
  {
    group: serviceRuntimeCoreGroup,
    code: "H",
    name: "http",
    productName: "HTTP Module",
    repoName: "http",
  },
  {
    group: serviceRuntimeCoreGroup,
    code: "Ht",
    name: "html",
    productName: "HTML Module",
    repoName: "html",
  },
  {
    group: serviceRuntimeCoreGroup,
    code: "Hx",
    name: "hexagon",
    productName: "Hexagon Module",
    repoName: "hexagon",
  },
  {
    group: serviceRuntimeCoreGroup,
    code: "Jo",
    name: "jose",
    productName: "JOSE Module",
    repoName: "jose",
  },
  {
    group: serviceRuntimeCoreGroup,
    code: "Js",
    name: "json",
    productName: "JSON Module",
    repoName: "json",
  },
  {
    group: serviceRuntimeCoreGroup,
    code: "L",
    name: "logger",
    productName: "Logger Module",
    repoName: "logger",
  },
  {
    group: serviceRuntimeCoreGroup,
    code: "O",
    name: "openapi",
    productName: "OpenAPI Module",
    repoName: "openapi",
  },
  {
    group: serviceRuntimeCoreGroup,
    code: "P",
    name: "poppins",
    productName: "Poppins Module",
    repoName: "poppins",
  },
  {
    group: serviceRuntimeCoreGroup,
    code: "Pi",
    name: "ping",
    productName: "Ping Module",
    repoName: "ping",
  },
  {
    group: serviceRuntimeCoreGroup,
    code: "Ro",
    name: "robots",
    productName: "Robots Module",
    repoName: "robots",
  },
  {
    group: serviceRuntimeCoreGroup,
    code: "W",
    name: "windfall",
    productName: "Windfall Module",
    repoName: "windfall",
  },
];

const serviceRuntimeSpecialGroup: Group = {
  color: "#881337",
  textColor: "#FFE4E6",
  name: "service-runtime-special-modules",
  repoTopics: ["module", "runtime"],
};

const serviceRuntimeSpecialHexagons: ReadonlyArray<Hexagon> = [
  {
    group: serviceRuntimeSpecialGroup,
    code: "B",
    name: "brand",
    productName: "Brand Module",
    repoName: "brand",
  },
  {
    group: serviceRuntimeSpecialGroup,
    code: "Be",
    name: "bestagons",
    productName: "Bestagons Module",
    repoName: "bestagons",
  },
  {
    group: serviceRuntimeSpecialGroup,
    code: "Eb",
    name: "event-bus",
    productName: "Event Bus Module",
    repoName: "event-bus",
  },
  {
    group: serviceRuntimeSpecialGroup,
    code: "Es",
    name: "event-store",
    productName: "Event Store Module",
    repoName: "event-store",
  },
  {
    group: serviceRuntimeSpecialGroup,
    code: "F",
    name: "fetch",
    productName: "Fetch Module",
    repoName: "fetch",
  },
  {
    group: serviceRuntimeSpecialGroup,
    code: "Fa",
    name: "favicon",
    productName: "Favicon Module",
    repoName: "favicon",
  },
  {
    group: serviceRuntimeSpecialGroup,
    code: "Md",
    name: "markdown",
    productName: "Markdown Module",
    repoName: "markdown",
  },
  {
    group: serviceRuntimeSpecialGroup,
    code: "Mq",
    name: "message-queue",
    productName: "Message Queue Module",
    repoName: "message-queue",
  },
  {
    group: serviceRuntimeSpecialGroup,
    code: "Og",
    name: "org",
    productName: "Org Module",
    repoName: "org",
  },
  {
    group: serviceRuntimeSpecialGroup,
    code: "S",
    name: "sql",
    productName: "SQL Module",
    repoName: "sql",
  },
  {
    group: serviceRuntimeSpecialGroup,
    code: "Ti",
    name: "time",
    productName: "Time Module",
    repoName: "time",
  },
  {
    group: serviceRuntimeSpecialGroup,
    code: "Tx",
    name: "texts",
    productName: "Texts Module",
    repoName: "texts",
  },
  {
    group: serviceRuntimeSpecialGroup,
    code: "U",
    name: "unit-of-work",
    productName: "Unit of Work Module",
    repoName: "unit-of-work",
  },
  {
    group: serviceRuntimeSpecialGroup,
    code: "Wa",
    name: "wait-for-it",
    productName: "Wait for It Module",
    repoName: "wait-for-it",
  },
];

const serviceDevCoreGroup: Group = {
  color: "orange",
  textColor: "white",
  name: "service-dev-core-modules",
  repoTopics: ["module", "dev"],
};

const serviceDevCoreHexagons: ReadonlyArray<Hexagon> = [
  {
    group: serviceDevCoreGroup,
    code: "Ec",
    name: "eslint-config",
    productName: "ESLint Config Module",
    repoName: "eslint-config",
  },
  {
    group: serviceDevCoreGroup,
    code: "Pa",
    name: "package-lint",
    productName: "Package Lint Module",
    repoName: "package-lint",
  },
  {
    group: serviceDevCoreGroup,
    code: "Pc",
    name: "prettier-config",
    productName: "Prettier Config Module",
    repoName: "prettier-config",
  },
  {
    group: serviceDevCoreGroup,
    code: "Rc",
    name: "redocly-config",
    productName: "Redocly Config Module",
    repoName: "redocly-config",
  },
  {
    group: serviceDevCoreGroup,
    code: "T",
    name: "test",
    productName: "Test Module",
    repoName: "test",
  },
  {
    group: serviceDevCoreGroup,
    code: "Tc",
    name: "tsconfig",
    productName: "TSConfig Module",
    repoName: "tsconfig",
  },
];

const otherModuleGroup: Group = {
  color: "#C2410C",
  textColor: "#FFF7ED",
  name: "other-modules",
  repoTopics: ["module", "dev"],
};

const otherModuleHexagons: ReadonlyArray<Hexagon> = [
  {
    group: otherModuleGroup,
    code: "C",
    name: "cli",
    productName: "CLI Module",
    repoName: "cli",
  },
  {
    group: otherModuleGroup,
    code: "Ch",
    name: "child-process",
    productName: "Child Process Module",
    repoName: "child-process",
  },
  {
    group: otherModuleGroup,
    code: "Oc",
    name: "openapi-cli",
    productName: "OpenAPI CLI Module",
    repoName: "openapi-cli",
  },
  {
    group: otherModuleGroup,
    code: "Ph",
    name: "phrase",
    productName: "Phrase Module",
    repoName: "phrase",
  },
  {
    group: otherModuleGroup,
    code: "Pm",
    name: "postgres-migrate",
    productName: "Postgres Migrate Module",
    repoName: "postgres-migrate",
  },
  {
    group: otherModuleGroup,
    code: "Ps",
    name: "pubsub",
    productName: "PubSub Module",
    repoName: "pubsub",
  },
  {
    group: otherModuleGroup,
    code: "Ll",
    name: "link-local-module",
    productName: "Link Local Module",
    repoName: "link-local-module",
  },
];

const orgGroup: Group = {
  color: "#303030",
  textColor: "#FFFFFF",
  name: "org-services",
  repoTopics: ["service", "org"],
};

const orgHexagons: ReadonlyArray<Hexagon> = [
  {
    group: orgGroup,
    code: "Ad",
    devPort: 6568,
    name: "admin",
    productName: "Admin Service",
    repoName: "admin-service",
  },
  {
    group: orgGroup,
    code: "Co",
    devPort: 6779,
    name: "confluence",
    productName: "Confluence Service",
    repoName: "confluence-service",
  },
  {
    group: orgGroup,
    code: "D",
    devPort: 6800,
    name: "dashboard",
    productName: "Dashboard Service",
    repoName: "dashboard-service",
  },
  {
    group: orgGroup,
    code: "Di",
    devPort: 6873,
    name: "disco",
    productName: "Disco Service",
    repoName: "disco-service",
  },
  {
    group: orgGroup,
    code: "Gh",
    devPort: 7172,
    name: "github",
    productName: "GitHub Service",
    repoName: "github-service",
  },
  {
    group: orgGroup,
    code: "Np",
    devPort: 7880,
    name: "npm",
    productName: "NPM Service",
    repoName: "npm-service",
  },
  {
    group: orgGroup,
    code: "Or",
    devPort: 7982,
    name: "org",
    productName: "Org Service",
    repoName: "org-service",
  },
  {
    group: orgGroup,
    code: "Sc",
    devPort: 8367,
    name: "scalingo",
    productName: "Scalingo Service",
    repoName: "scalingo-service",
  },
  {
    group: orgGroup,
    code: "Sl",
    devPort: 8376,
    name: "slack",
    productName: "Slack Service",
    repoName: "slack-service",
  },
  {
    group: orgGroup,
    code: "So",
    devPort: 8379,
    name: "sonarcloud",
    productName: "SonarCloud Service",
    repoName: "sonarcloud-service",
  },
  {
    group: orgGroup,
    code: "Ts",
    devPort: 8483,
    name: "train",
    productName: "Train Service",
    repoName: "train-service",
  },
];

const platformGroup: Group = {
  color: "#3730A3",
  textColor: "#E0E7FF",
  name: "platform-services",
  repoTopics: ["service", "platform"],
};

const platformHexagons: ReadonlyArray<Hexagon> = [
  {
    group: platformGroup,
    code: "Da",
    devPort: 6865,
    name: "data",
    productName: "Data Service",
    repoName: "data-service",
  },
  {
    group: platformGroup,
    code: "De",
    devPort: 6869,
    name: "developer",
    productName: "Developer Service",
    repoName: "developer-service",
  },
  {
    group: platformGroup,
    code: "Ev",
    devPort: 6986,
    name: "event",
    productName: "Event Service",
    repoName: "event-service",
  },
  {
    group: platformGroup,
    code: "Ex",
    devPort: 6988,
    name: "export",
    productName: "Export Service",
    repoName: "export-service",
  },
  {
    group: platformGroup,
    code: "Id",
    devPort: 7368,
    name: "identity",
    productName: "ID Service",
    repoName: "id-service",
  },
  {
    group: platformGroup,
    code: "Oa",
    devPort: 7965,
    name: "oauth2",
    productName: "OAuth2 Service",
    repoName: "oauth2-service",
  },
  {
    group: platformGroup,
    code: "Od",
    devPort: 7968,
    name: "odometer",
    productName: "Odometer Service",
    repoName: "odometer-service",
  },
  {
    group: platformGroup,
    code: "We",
    devPort: 8769,
    name: "webhook",
    productName: "Webhook Service",
    repoName: "webhook-service",
  },
];

const ioGroup: Group = {
  color: "#6B21A8",
  textColor: "#E9D5FF",
  name: "io-services",
  repoTopics: ["service", "io"],
};

const ioHexagons: ReadonlyArray<Hexagon> = [
  {
    group: ioGroup,
    code: "Br",
    devPort: 6682,
    name: "brevo",
    productName: "Brevo Service",
    repoName: "brevo-service",
  },
  {
    group: ioGroup,
    code: "Ia",
    devPort: 7365,
    name: "iam",
    productName: "IAM Service",
    repoName: "iam-service",
  },
  {
    group: ioGroup,
    code: "Li",
    devPort: 7673,
    name: "licensing",
    productName: "Licensing Service",
    repoName: "licensing-service",
  },
  {
    group: ioGroup,
    code: "Ma",
    devPort: 7765,
    name: "mail",
    productName: "Mail Service",
    repoName: "mail-service",
  },
  {
    group: ioGroup,
    code: "Tr",
    devPort: 8482,
    name: "tracking",
    productName: "Tracking Service",
    repoName: "tracking-service",
  },
];

const testGroup: Group = {
  color: "#65A30D",
  textColor: "#ECFCCB",
  name: "test-services",
  repoTopics: ["service", "test"],
};

const testHexagons: ReadonlyArray<Hexagon> = [
  {
    group: testGroup,
    code: "Ee",
    devPort: 6969,
    name: "e2e",
    productName: "E2E Service",
    repoName: "e2e-service",
  },
  {
    group: testGroup,
    code: "Te",
    devPort: 8469,
    name: "test",
    productName: "Test Service",
    repoName: "test-service",
  },
];

const appGroup: Group = {
  color: "#115E59",
  textColor: "#CCFBF1",
  name: "apps",
  repoTopics: ["app"],
};

const appHexagons: ReadonlyArray<Hexagon> = [
  {
    group: appGroup,
    code: "Ap",
    devPort: 6580,
    name: "hda",
    productName: "HDA App",
    repoName: "hda-app",
  },
  {
    group: appGroup,
    code: "Dm",
    devPort: 6877,
    name: "demo",
    productName: "Demo App",
    repoName: "demo-app",
  },
  {
    group: appGroup,
    code: "Dx",
    devPort: 6888,
    name: "dexcom",
    productName: "Dexcom App",
    repoName: "dexcom-app",
  },
];

const otherGroup: Group = {
  color: "#C026D3",
  textColor: "#FAE8FF",
  name: "other",
  repoTopics: ["service"],
};

const otherHexagons: ReadonlyArray<Hexagon> = [
  {
    group: otherGroup,
    code: "Bs",
    devPort: 6683,
    name: "brand",
    productName: "Brand Service",
    repoName: "brand-service",
  },
  {
    group: otherGroup,
    code: "Hs",
    devPort: 8111,
    name: "hedia-server",
    productName: "Hedia Server",
    repoName: "hedia-server",
  },
];

const allHexagons: Array<Hexagon> = [
  ...serviceRuntimeCoreHexagons,
  ...serviceRuntimeSpecialHexagons,
  ...serviceDevCoreHexagons,
  ...otherModuleHexagons,
  ...orgHexagons,
  ...platformHexagons,
  ...ioHexagons,
  ...testHexagons,
  ...appHexagons,
  ...otherHexagons,
].sort(compareByString("code")); // upgrade BareGroup to Group

for (const hexagon of allHexagons) {
  hexagon.group.hexagons ||= [];
  hexagon.group.hexagons.push(hexagon);
}

const allGroups = allHexagons
  .reduce(
    (seen, hexagon) =>
      seen.includes(hexagon.group) ? seen : [...seen, hexagon.group],
    [] as Group[]
  )
  .sort(compareByString("name"));

export const groups = allGroups;
export const hexagons = allHexagons;
