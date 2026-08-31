# Amrutam – Ayurvedic Super App

A production-oriented React Native application developed as part of the **Amrutam Senior React Assignment**.

Amrutam is designed as an Ayurvedic Super App with three independent business modules:

1. **Consultations**
2. **Shop**
3. **Health Records**

The implementation focuses on scalable architecture, performance, offline-first behavior, reliability, maintainability, strong typing, and developer experience.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [State Management](#state-management)
- [API Abstraction](#api-abstraction)
- [Performance and Scalability](#performance-and-scalability)
- [Offline-First Strategy](#offline-first-strategy)
- [Reliability and Error Handling](#reliability-and-error-handling)
- [Theme and Dark Mode](#theme-and-dark-mode)
- [Accessibility](#accessibility)
- [Feature Flags](#feature-flags)
- [Testing](#testing)
- [End-to-End Testing](#end-to-end-testing)
- [Developer Experience](#developer-experience)
- [Environment Configuration](#environment-configuration)
- [Trade-offs](#trade-offs)
- [Future Improvements](#future-improvements)
- [Installation and Setup](#installation-and-setup)
- [Testing Commands](#testing-commands)
- [Assignment Requirement Coverage](#assignment-requirement-coverage)

---

# Project Overview

Amrutam is a React Native Ayurvedic Super App consisting of three independent feature modules.

### Consultation

Provides a consultation booking experience where users can discover doctors, view available slots, and manage consultations.

### Shop

Provides a mini e-commerce experience with a large product catalogue, search, filtering, sorting, cart management, wishlist support, and checkout summary.

### Health Records

Provides a patient health timeline containing different types of medical records and supports searching, filtering, tags, attachments, and date-based organization.

The application was designed with a focus on:

- Scalable architecture
- Large dataset handling
- Virtualized rendering
- Offline-first functionality
- Local persistence
- Error handling
- Reusable components
- Strong TypeScript typing
- Testability
- Developer experience

---

# Features

## Consultation Module

The Consultation module includes:

- Doctor listing
- Doctor search
- Doctor filtering
- Doctor details
- Available consultation slots
- Booking flow
- Upcoming consultations
- Consultation cancellation
- Slot/business logic handling
- Generated doctor and slot data

The architecture keeps consultation-specific logic isolated inside the consultation feature.

---

## Shop Module

The Shop module includes:

- Product listing
- Large product dataset
- Infinite/virtualized scrolling
- Product search
- Multi-filter support
- Sorting
- Product details
- Cart
- Quantity updates
- Wishlist
- Checkout summary
- Local cart persistence

The application generates **20,000 products** to simulate a large production catalogue.

---

## Health Records Module

The Health Records module includes:

- Patient timeline
- Lab reports
- Prescriptions
- Consultation records
- Vaccination records
- Allergy records
- Search
- Filters
- Tags
- Record details
- Attachment support
- Month/year organization

The module is structured to support large generated health-record datasets.

---

# Tech Stack

| Technology                   | Purpose                                     |
| ---------------------------- | ------------------------------------------- |
| React Native                 | Mobile application framework                |
| TypeScript                   | Static typing                               |
| Expo                         | React Native development and native tooling |
| React Navigation             | Application navigation                      |
| Redux Toolkit                | Global application state                    |
| Redux Saga                   | Side-effect orchestration                   |
| TanStack React Query         | Server/API state                            |
| Axios                        | API abstraction                             |
| AsyncStorage                 | Persistent local storage                    |
| NetInfo                      | Network connectivity detection              |
| Jest                         | Automated testing                           |
| React Native Testing Library | React Native testing                        |
| Detox                        | End-to-end testing                          |

---

# Architecture

The application follows a **feature-based architecture**.

Business functionality is separated into independent feature modules while shared infrastructure is placed into reusable application-level services.

High-level architecture:

```text
                    ┌─────────────────────┐
                    │       Screens       │
                    │    React Native UI  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Feature Modules   │
                    │                     │
                    │ Consultations       │
                    │ Shop                │
                    │ Health Records      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Business Logic    │
                    │   Types / Utilities │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Shared Services   │
                    │                     │
                    │ API                 │
                    │ Storage             │
                    │ Sync                │
                    │ Logging             │
                    └─────────────────────┘
```

---

# Folder Structure

```text
src/
│
├── app/
│   └── providers/
│       ├── AppProviders.tsx
│       └── SyncProvider.tsx
│
├── components/
│   ├── common/
│   └── ui/
│       ├── ErrorBoundary.tsx
│       └── Toast.tsx
│
├── config/
│   ├── env.ts
│   └── featureFlags.ts
│
├── constants/
│   └── app.ts
│
├── features/
│   │
│   ├── auth/
│   │   └── screens/
│   │       ├── ForgotPasswordScreen.tsx
│   │       ├── LoginScreen.tsx
│   │       ├── SettingsScreen.tsx
│   │       └── SignUpScreen.tsx
│   │
│   ├── consultations/
│   │   ├── components/
│   │   │   └── DoctorCard.tsx
│   │   ├── screens/
│   │   │   ├── ConsultationScreen.tsx
│   │   │   ├── DoctorDetailsScreen.tsx
│   │   │   └── UpcomingConsultationsScreen.tsx
│   │   ├── types/
│   │   │   ├── booking.ts
│   │   │   ├── doctor.ts
│   │   │   └── slot.ts
│   │   └── utils/
│   │       ├── bookingService.ts
│   │       ├── consultationFilters.ts
│   │       ├── mockDoctors.ts
│   │       ├── mockSlots.ts
│   │       └── __tests__/
│   │           └── mockSlots.test.ts
│   │
│   ├── health-records/
│   │   ├── screens/
│   │   │   ├── HealthRecordsScreen.tsx
│   │   │   └── RecordDetailsScreen.tsx
│   │   ├── types/
│   │   │   └── record.ts
│   │   └── utils/
│   │       └── mockRecords.ts
│   │
│   └── shop/
│       ├── screens/
│       │   ├── CartScreen.tsx
│       │   ├── CheckoutScreen.tsx
│       │   ├── ProductDetailsScreen.tsx
│       │   └── ShopScreen.tsx
│       ├── types/
│       │   └── product.ts
│       └── utils/
│           ├── cartService.ts
│           ├── mockProducts.ts
│           └── __tests__/
│               ├── cartService.test.ts
│               └── mockProducts.test.ts
│
├── navigation/
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── MainNavigator.tsx
│   ├── MainTabs.tsx
│   └── types.ts
│
├── services/
│   ├── api/
│   │   ├── apiClient.ts
│   │   ├── cachedApi.ts
│   │   └── resilience.ts
│   ├── logger/
│   │   └── logger.ts
│   ├── storage/
│   │   ├── storage.ts
│   │   └── __tests__/
│   │       └── storage.test.ts
│   └── sync/
│       └── syncQueue.ts
│
├── store/
│   ├── hooks.ts
│   ├── store.ts
│   ├── sagas/
│   │   ├── authSaga.ts
│   │   └── rootSaga.ts
│   └── slices/
│       └── authSlice.ts
│
├── theme/
│   └── theme.ts

```

---

# State Management

State management is divided according to the responsibility of the data.

## Redux Toolkit

Redux Toolkit is used for global application state.

Benefits include:

- Centralized state management
- Predictable state updates
- Slice-based organization
- Strong TypeScript integration
- Reduced Redux boilerplate

## Redux Saga

Redux Saga is used for asynchronous side effects where saga-based orchestration is appropriate.

This keeps side-effect handling separate from UI components and helps maintain clean data flow.

## TanStack React Query

TanStack React Query is used for server/API state.

It provides a structured approach for:

- Fetching data
- Caching
- Refetching
- Server-state lifecycle management

## React Local State

Component-specific UI state remains local to the component or screen.

This avoids unnecessarily putting transient UI state into global application state.

## AsyncStorage

AsyncStorage is used for persistent local data.

The Shop cart is persisted locally so that cart information can survive application restarts and offline conditions.

---

# API Abstraction

Network-related functionality is isolated inside:

```text
services/
└── api/
    ├── apiClient.ts
    ├── cachedApi.ts
    └── resilience.ts
```

This prevents screens and components from becoming tightly coupled to network implementation details.

The abstraction provides a central location for:

- API requests
- Cached responses
- Network resilience
- Timeout/failure handling
- Future authentication/interceptors
- Consistent API behavior

---

# Performance and Scalability

The assignment requires the application to comfortably support:

- **5,000 doctors**
- **20,000 products**
- **10,000 health records**

Generated/mock datasets are used to reproduce large collections consistently.

## Virtualized Rendering

Large lists use React Native's virtualized list mechanisms so that the entire dataset does not need to be mounted in the UI simultaneously.

This helps reduce:

- Memory usage
- Initial rendering work
- Number of mounted components
- UI thread pressure

## Large Product Dataset

The Shop module generates **20,000 products** to exercise:

- Product rendering
- Search
- Filtering
- Sorting
- Cart interactions

## Large Consultation Dataset

The Consultation module is structured around generated doctor data and slot data so that the architecture can support thousands of doctors.

## Large Health Record Dataset

The Health Records module uses generated record data to support testing with large timelines.

## Performance Principles

The implementation follows these principles:

- Virtualized rendering for large lists
- Stable list keys
- Avoid unnecessary state updates
- Keep feature-specific state localized
- Separate data processing from presentation
- Avoid rendering the entire dataset at once
- Keep reusable UI components isolated
- Use generated datasets for scalability testing

---

# Offline-First Strategy

The application is designed to continue functioning when network connectivity is unavailable.

The general flow is:

## Offline Cart

Cart information is stored locally using AsyncStorage.

This allows the cart to remain available without an active internet connection.

Cart persistence is implemented through:

```text
src/features/shop/utils/cartService.ts
src/services/storage/storage.ts
```

## Mutation Queue

Offline mutations can be queued locally rather than requiring an immediate network connection.

The synchronization infrastructure is located at:

```text
src/services/sync/syncQueue.ts
```

## Connectivity

Network connectivity is integrated through:

```text
src/app/providers/SyncProvider.tsx
```

The goal is to synchronize queued changes when connectivity becomes available again.

---

# Reliability and Error Handling

Reliability concerns are separated into reusable services and UI infrastructure.

Relevant files include:

```text
src/services/api/resilience.ts
src/services/logger/logger.ts
src/components/ui/ErrorBoundary.tsx
src/components/ui/Toast.tsx
```

## Error Boundary

The Error Boundary provides a controlled fallback when an unexpected rendering error occurs.

This prevents a single UI error from resulting in an uncontrolled application failure.

## Toast System

The shared Toast system provides a consistent mechanism for displaying user feedback such as:

- Errors
- Warnings
- Success messages
- Action feedback

## Logging

Logging is centralized through:

```text
src/services/logger/logger.ts
```

Centralized logging makes it easier to add production logging, monitoring, or crash-reporting integrations later.

## API Resilience

Network-related resilience is separated into:

```text
src/services/api/resilience.ts
```

This provides a dedicated place for handling network failures and future retry/timeout policies.

---

# Theme and Dark Mode

The application has a shared theme system:

```text
src/theme/theme.ts
```

Theme values are consumed by screens and shared UI components.

The application supports:

- Light mode
- Dark mode
- Theme-aware backgrounds
- Theme-aware text
- Theme-aware borders
- Theme-aware primary actions

This avoids scattering UI color decisions throughout the application.

---

# Accessibility

Accessibility is considered at the component and interaction level.

The application aims to provide:

- Meaningful accessibility labels
- Appropriate accessibility roles
- Accessible interactive controls
- Readable text
- Clear user feedback
- Appropriate touch targets
- Accessible navigation interactions

---

# Feature Flags

Feature flags are implemented through:

```text
src/config/featureFlags.ts
```

Feature flags allow functionality to be enabled or disabled without removing the underlying implementation.

This provides a foundation for:

- Controlled feature releases
- Gradual rollouts
- Quickly disabling problematic functionality
- Environment-specific functionality

---

# Testing

The project uses Jest for automated tests.

Current test suites cover storage, business logic, generated data and consultation slot logic.

## Storage Tests

```text
src/services/storage/__tests__/storage.test.ts
```

Tests persistent storage behavior.

## Cart Business Logic

```text
src/features/shop/utils/__tests__/cartService.test.ts
```

Tests cart operations such as:

- Adding products
- Updating quantities
- Removing items
- Cart persistence behavior

## Product Data Tests

```text
src/features/shop/utils/__tests__/mockProducts.test.ts
```

Tests generated product data.

## Consultation Slot Tests

```text
src/features/consultations/utils/__tests__/mockSlots.test.ts
```

Tests consultation slot-related logic.

Run the tests with:

```bash
npm test
```

---

# End-to-End Testing

Detox is configured for Android end-to-end testing.

The E2E setup is separated from the regular Jest configuration.

```text
e2e/
├── jest.config.js
└── starter.test.js
```

The Detox configuration is:

```text
.detoxrc.js
```

The intended E2E scenario covers a complete shopping flow.

Build the Detox application with:

```bash
npx detox build --configuration android.att.debug
```

Run the E2E tests with:

```bash
npx detox test --configuration android.att.debug
```

The E2E configuration requires a properly configured Android native build environment and an available Android device/emulator.

---

# Developer Experience

The project is organized so that another developer can work on a specific feature without needing to understand the entire application.

Feature modules are isolated:

```text
features/
├── consultations/
├── shop/
└── health-records/
```

Shared infrastructure is kept separately:

```text
services/
navigation/
theme/
store/
components/
```

This provides clear ownership between business functionality and shared application infrastructure.

## TypeScript

TypeScript is used throughout the project to provide compile-time validation for:

- Product data
- Doctor data
- Consultation slots
- Bookings
- Health records
- Navigation parameters
- Service APIs
- Application state

Strong typing reduces runtime errors and makes refactoring safer.

---

# Environment Configuration

Environment-related configuration is separated into:

```text
src/config/env.ts
```

Keeping configuration separate from application logic makes it easier to support different environments such as:

- Development
- Testing
- Staging
- Production

Environment-specific configuration can be extended as the application moves toward production APIs and services.

---

# Trade-offs

## Generated Data Instead of a Production Backend

Generated data was used for the assignment so that large datasets can be reproduced consistently.

This makes it possible to test scalability with:

```text
5,000 doctors
20,000 products
10,000 health records
```

without depending on an external API being available.

## AsyncStorage for Local Persistence

AsyncStorage was selected for assignment-level persistence because it provides a simple React Native storage mechanism without introducing unnecessary infrastructure.

For production health information, a secure/encrypted storage mechanism would be more appropriate.

## Feature-Based Architecture

The feature-based architecture introduces more folders and structure than a simple screen-based application.

The trade-off is intentional because it provides:

- Better separation
- Easier feature ownership
- Reduced coupling
- Better scalability
- Easier onboarding

# Installation and Setup

## Prerequisites

Make sure the development environment has:

- Node.js
- npm
- React Native/Expo development environment
- Android SDK for Android development
- Java/JDK for Android builds

## Install Dependencies

Clone the repository:

```bash
git clone https://github.com/Hari-techx/amrutam
```

Navigate into the project:

```bash
cd amrutam
```

Install dependencies:

```bash
npm install
```

## Start the Application

Start Expo:

```bash
npm start
```

Run Android:

```bash
npm run android
```

Run iOS:

```bash
npm run ios
```

---

# Testing Commands

## Unit and Business Logic Tests

```bash
npm test
```

## Detox Build

```bash
npx detox build --configuration android.att.debug
```

## Detox E2E

```bash
npx detox test --configuration android.att.debug
```

# Project Summary

Amrutam demonstrates a modular React Native architecture designed around independent business features and reusable application infrastructure.

The implementation focuses on the engineering challenges highlighted in the assignment:

- Scalable feature architecture
- Large dataset rendering
- Local persistence
- Offline-first synchronization
- API abstraction
- Error handling
- Strong TypeScript typing
- Reusable UI infrastructure
- Theme support
- Feature flags
- Automated testing
- Developer experience

The architecture is designed so that the current mock implementations can be replaced with production APIs and infrastructure without requiring a complete rewrite of the feature modules.
