# Microservices Project

## Overview

This project consists of three microservices: User Service, News Service, and Notification Service. Each service is responsible for specific functionality and they communicate with each other to perform their tasks.

## Services

### User Service

- **Port**: 3003
- **Description**: Manages user data and preferences.
- **Endpoints**:
  - `GET /user/all-users` - Fetch all users.
  - `GET /user/:id` - Fetch user details by id.
  - `POST /user/register` - Register a new user.
  - `PATCH /user/preferences` - Update user preferences.

### News Service

- **Port**: 3004
- **Description**: Fetches news based on user preferences.
- **Endpoints**:
  - `GET /news/:preferences` - Fetch news based on user preferences.

### Notification Service

- **Port**: 3002
- **Description**: Sends notifications via email and Telegram.
- **Endpoints**:
  - `POST /email/send` - Send email notification.
  - `POST /telegram/send` - Send Telegram notification.
