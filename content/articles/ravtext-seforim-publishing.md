---
title: "RavText: The Secret Weapon Behind Professional Seforim Publishing"
description: How a $490 InDesign Extension Solves the Most Complex Challenge in Hebrew Typography
createdAt: 2026-02-14
image: YLSwjSy7stw
---

If you've ever held a Vilna Shas, flipped through a classic edition of the Rambam, or studied from any traditional sefer with commentaries, you've encountered one of the most sophisticated page layouts in all of typography: **צורת הדף** (Tzurat HaDaf) — the traditional "shape of the page."

It looks effortless. The main text sits in the center, surrounded by commentaries that wrap around it in perfect harmony. When Rashi's commentary is shorter, Tosfos expands to fill the space. When one commentary ends mid-column, the others flow around it like water.

**Behind that elegance lies a typesetter's nightmare.**

## The Problem: Hours of Manual Work

Traditional seforim layouts require text frames that aren't rectangles. They're complex polygons with multiple "steps" (ברכיים — literally "knees") where the frame indents to accommodate neighboring text.

In InDesign, creating these layouts manually means:

- **Drawing custom polygon shapes** with precise anchor points
- **Calculating exact measurements** for spacing and alignment
- **Constantly readjusting** as content changes
- **Rebuilding everything** when the text reflows

A skilled typesetter might spend **2-3 hours** laying out a single complex spread. And when the client sends revised text? Start over.

## The Solution: RavText

**RavText** (רב טקסט) is an InDesign extension I built specifically for this workflow. It reduces those hours to minutes.

Here's what makes it work:

### 1. צורת הדף Panel — Automatic Layout Generation

Select your text frames (up to three), click "החל ברך" (Apply Berech), and RavText:

- **Analyzes content length** of each frame
- **Calculates optimal shape** based on which text is longest
- **Creates complex polygon paths** automatically
- **Maintains proper spacing** between all elements

The extension intelligently detects whether you're creating a simple two-column wrap or a full three-column Talmud-style layout with nested "berechot."

**Add or remove lines** from any column with a single click. RavText recalculates all affected frames instantly — the kind of adjustment that would take 10 minutes manually now takes 2 seconds.

### 2. קישורים Panel — Reference Tracking

Here's a problem unique to seforim: commentaries reference the main text by markers (אות א׳, אות ב׳, etc.). But how do you know if a reference in Rashi points to a marker that actually exists in the Gemara text?

The קישורים (Links) panel solves this by:

- **Naming and registering** each text story (Gemara, Rashi, Tosfos, etc.)
- **Defining relationships** between stories via character styles
- **Scanning in real-time** for missing references
- **Alerting you** before the sefer goes to print with broken references

No more discovering on printed galleys that אות ט״ז in the commentary points to a marker that was deleted three revisions ago.

### 3. מיספור Panel — Hebrew Auto-Numbering

Hebrew numbering isn't just "א, ב, ג" — it's a system with its own rules:

- Letters have numerical values (גימטריא)
- Certain letter combinations must be avoided ("לשון נקיה")
- The number 15 is ט״ו (not י״ה) for religious reasons
- The number 16 is ט״ז (not י״ו) similarly

RavText handles all of this automatically, generating proper Hebrew letter sequences that respect tradition.

## Under the Hood: How It Works

RavText is built as a **CEP (Common Extensibility Platform) extension** using:

- **ExtendScript (JSX)** for InDesign DOM manipulation
- **Vue.js** for the panel UI
- **Adobe Spectrum** design system for native look and feel

The core magic happens in the layout engine, where functions manipulate InDesign's `TextFrame.paths` API to create non-rectangular frame shapes.

What's clever is how RavText **stores position metadata** in InDesign labels. Each frame remembers whether it's the "left," "middle," or "right" column, and what type of "berech" it's part of. This enables intelligent subsequent operations — adding a line to the outer column knows exactly which anchor points to adjust.

## Who Should Use RavText?

- **Publishing houses** producing traditional seforim
- **Individual typesetters** working on Hebrew religious texts
- **Print shops** that handle sefer layout jobs
- **Self-publishers** creating their own Torah works

If you work with Hebrew texts that need commentary-style layouts, RavText pays for itself in the first week.

## The Numbers

- **Price:** $490 (one-time license)
- **Requirements:** InDesign CS6 or later
- **Training:** Free 8-chapter course available at [kubi.co.il](https://kubi.co.il/blog/8396000) (use code RAV10TXT for 10% off)

## The Bottom Line

There's a reason RavText has become the standard tool in the frum publishing world. It solves a genuinely hard problem — one that requires deep understanding of both InDesign's capabilities and the unique requirements of traditional seforim layout.

The time it saves isn't marginal. It's transformative.

**[Get RavText →](https://indesign.yiddishe-kop.com/scripts/4)**
