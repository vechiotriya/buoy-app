# Buoy 💰⚓

**Buoy** is a mobile budgeting and expense tracking app built with **React Native and Expo**.
It helps users stay financially afloat by making it simple to record expenses, organize spending into categories, and monitor budgets.

---

## Features

* 📊 **Expense Tracking**
  Quickly record daily expenses with amount, category, and notes.

* 🗂 **Custom Categories**
  Organize spending into categories like Food, Transport, Bills, and more.

* 📅 **Spending History**
  View and review past expenses anytime.

* 📈 **Budget Awareness**
  Understand where your money goes and manage your spending habits.

* ⚡ **Fast and Simple UI**
  Designed for quick entries and smooth navigation.

---

## Tech Stack

* **React Native**
* **Expo**
* **TypeScript**

---

## Backend

The backend for Buoy is maintained in a separate repository:


---

## Installation

1. Clone the repository

```bash
git clone https://github.com/vechiotriya/buoy-app.git
```

2. Navigate to the project folder

```bash
cd buoy-app
```

3. Install dependencies

```bash
pnpm i
```

4. Run the app

```bash
pnpm android
```
---

## Project Structure

```
buoy-app
│
├── android
├── assets
├── src
│   ├─ app
│   │   ├─(protected)
│   │   ├──_layout.tsx
│   │   └─ sign.tsx // for authentication and signup
│   ├─ components
│   ├─ constants
│   ├─ features // contains files for each feature (hooks,styles,etc)
│   ├─ hooks
│   ├─ services
│   ├─ store
│   └─ tabs
├── app.json
├── package.json
└── pnpm-lock.yaml
```
---

**Buoy – Keep your finances afloat. ⚓**
