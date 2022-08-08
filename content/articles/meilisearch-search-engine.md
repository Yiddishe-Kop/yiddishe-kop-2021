---
title: Meilisearch search engine
description: Multi index search with Laravel Scout & Meilisearch
createdAt: 2022-07-31
image: afW1hht0NSs
draft: true
---

At some point, most applications will want a good search experience. The search should be fast, show relevant results at the top and be typo tolerant.

The easy solution is to simply use a SQL query to perform the search using the `LIKE` operator. But this quickly becomes insufficient, as it doesn't order the results according to relevancy (among other things).

This is where a search-engine comes in. One popular open-source search-engine is [Meilisearch](https://meilisearch.com/). It is an advanced search-engine with all the features needed to build a great search experience.

## Relevance

Search results are sorted according to predefined **ranking rules**. Results that rank higher show up first in the list of results.

Meilisearch contains six built in rules:

1. `words`:
   The more words it matches, the higher it ranks.

2. `typo`:
   The less typos in the search vs result, the higher it ranks.

3. `proximity`:
   The closer together the search words are in the result, the higher it ranks.

4. `attribute`:
   If the results have multiple attributes, e.g. `title` & `description`, and `title` is a more important attribute than `description`, the results that have matches in `title` will rank higher. Also matches found in the beginning of attributes will rank higher that results with matches at the end of the attribute.

5. `sort`:
   Results are sorted by the parameters passed to the `sort` method at query time.

6. `exactness`:
   The more similar the matched words are to the search, the higher it ranks. e.g. when searching for `'house'` - `'My house'` will rank higher than `My houses`.

These are the default built-in ranking rules. The order of the ranking rules matter, as the first rule has the most impact, and so on. The order can be changed, as can every aspect of the search-engine behaviour be configured.

### Attribute ranking order

The word
