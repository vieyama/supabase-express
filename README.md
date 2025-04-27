### Step-by-Step Guide

#### Step 1: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

#### Step 2: 🏃‍♂️ Running the Project

- Development Mode: `yarn start:dev`
- Building: `yarn build`
- Production Mode: Set `NODE_ENV="production"` in `.env` then `yarn build && yarn start:prod`

## 📁 Folder Structure

```code
├── biome.json
├── Dockerfile
├── LICENSE
├── package.json
├── yarn-lock.yaml
├── README.md
├── src
│   ├── api
│   │   └── properties
│   │       ├── propertiesController.ts
│   │       ├── propertiesModel.ts
│   │       ├── propertiesRepository.ts
│   │       ├── propertiesRouter.ts
│   │       └── propertiesService.ts
│   ├── api-docs
│   │   ├── __tests__
│   │   │   └── openAPIRouter.test.ts
│   │   ├── openAPIDocumentGenerator.ts
│   │   ├── openAPIResponseBuilders.ts
│   │   └── openAPIRouter.ts
│   ├── common
│   │   ├── __tests__
│   │   │   ├── errorHandler.test.ts
│   │   │   └── requestLogger.test.ts
│   │   ├── middleware
│   │   │   ├── authMiddleware.ts
│   │   │   ├── errorHandler.ts
│   │   │   ├── rateLimiter.ts
│   │   │   └── requestLogger.ts
│   │   ├── models
│   │   │   └── serviceResponse.ts
│   │   ├── types
│   │   │   └── properties.ts
│   │   └── utils
│   │       ├── asyncHandler.ts
│   │       ├── fileUpload.ts
│   │       ├── supabase.ts
│   │       ├── commonValidation.ts
│   │       ├── envConfig.ts
│   │       └── httpHandlers.ts
│   ├── index.ts
│   └── server.ts
├── tsconfig.json
└── vite.config.mts
```
