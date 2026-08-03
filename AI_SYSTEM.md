# System Overview

This repository contains two independent Next.js applications.

## admin-panel

Internal administration.

Used by platform administrators.

Responsibilities:

- clients
- projects
- billing
- authentication
- subdomains

## vencanja-main

Client application.

Contains:

- invitation renderer
- editor
- dashboard
- RSVP
- guest management
- seating
- settings

Projects are shared through Supabase.

UniversalProjectConfig is the contract between applications.

Never change config structure unless explicitly requested.