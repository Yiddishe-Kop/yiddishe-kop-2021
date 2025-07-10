---
title: My PR was denied by Iranian Law
description: My surprise when my pull-request was denied by Iranian law
createdAt: 2020-09-03
image: /img/israel-iran.png
---

### Contributing to the Laravel ecosystem

I recently discovered a valuable [Laravel package](https://github.com/armancodes/laravel-download-link) for generating download links for files, featuring useful capabilities such as expiry time and IP address restrictions.

However, one critical feature was missing: the ability to assign a DownloadLink to a specific user. This would enable scenarios where, for instance, a customer purchasing a digital product could receive a DownloadLink that only permits them to download the file.

Recognizing this as an opportunity to contribute to the Laravel ecosystem, I [forked the repository](https://github.com/Yiddishe-Kop/laravel-download-link), implemented the user assignment functionality, and submitted a comprehensive [pull-request](https://github.com/armancodes/laravel-download-link/pull/9) to the repository owner with detailed documentation of the changes.

The repository owner responded promptly, adding additional features (including support for assigning DownloadLinks to multiple users) and comprehensive tests within an hour. This swift response contrasted sharply with [other pull requests](https://github.com/inertiajs/inertia/pull/141) I had submitted, which remained pending for months.

### Tehran, Iran

When I later checked the status of my pull request, I was surprised to discover it had been closed without being merged. Upon investigation, I found the following message from the repository owner:

> Hi, Thanks for your great idea. I'm SO SORRY to tell you that I cannot merge this PR. There is a law in my country that we MUST NOT have any relationship with people from Israel or the Israel government. I hope you understand this, and again thanks for your time.

The developer was based in Tehran, Iran, and had identified my location as Jerusalem, Israel through my [GitHub profile](https://github.com/Yiddishe-Kop).

This experience was both surprising and disheartening, representing my first direct encounter with how geopolitical tensions between Israel and Iran manifest in the technical community. I had not previously been aware of such legal restrictions in Iran.

The situation raised questions about the scope of these laws – would they apply to a Palestinian resident of Jerusalem, or does Iranian legislation make such distinctions? Given my profile username "yiddishe-kop," my background was perhaps apparent.

After careful consideration, I responded with the following message:

> That's very sad, @armancodes. I hope one day your country removes this restriction, just like my country has never put such restrictions. However I'm sure that your governments restrictions don't represent your views 🤷‍♂️ . Good luck anyway! 😃

A colleague later humorously suggested an alternative response:

> Hi, I'm from the IRGC secret intelligence 🕵️‍♂️, we just wanted to test your loyalty to the regime, therefore we create fake accounts. You can merge the PR without any problem

### Open Source Community Response

Several days later, this incident was posted on [Hacker News](https://insin.github.io/react-hn/#/story/24364793?_k=l43je0) and gained significant attention, reaching the top of the trending list. The discussion centered around whether the Iranian developer had violated GitHub's Terms of Service and the broader implications of Iranian citizens using GitHub while Iran remains under US sanctions.

A notable development occurred when [Behdad Esfahbod](https://github.com/behdad), a prominent Iranian-Canadian open-source developer known for major projects like [HarfBuzz](https://github.com/harfbuzz/harfbuzz) (who had recently [experienced difficulties](https://medium.com/@behdadesfahbod/if-you-read-one-thing-from-me-please-be-this-2262ec7b8af2) with the IRGC), [commented on the repository](https://github.com/armancodes/laravel-download-link/pull/9#issuecomment-686413931) with a simple directive: **Just merge it.** Shortly after this intervention, the repository owner locked the conversation thread.

### Moving Forward

As a result of these circumstances, I will likely need to continue developing my fork of the repository independently to meet my project requirements. However, this situation represents a broader loss for the open-source community, where collaboration and shared innovation are foundational principles.

The hope remains that political restrictions will eventually be lifted, allowing developers worldwide to collaborate freely based on technical merit rather than geographical or political considerations.
