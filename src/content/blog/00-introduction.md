---
title: "Why I'm writing a neural networks series (and why from scratch)"
date: "2026-06-13"
summary: "The first post in a series that builds neural networks from scratch, and why that still matters in the age of LLMs."
slug: "neural-networks-from-scratch-intro"
---

I'm starting a series of blogs on neural networks. We'll deep-dive into the core concepts, and we'll write everything from scratch.

You might be thinking: LLMs are so popular today, so why do we even need this? Here's the thing. LLMs did not appear out of nowhere. They're the result of a long chain of ideas, and neural networks, along with all the concepts that come with them, are a big part of that chain. So if you want to understand how an LLM actually works, you first have to go back a little and make sure you understand the pieces it's built on.

The reason I'm writing this isn't only that I want people to understand how neural networks work. It's also a bit selfish: writing this will solidify my own understanding. There's a saying that if you can teach a concept well, then you truly know it. Putting these ideas into words is the fastest way for me to find the spots where my own understanding is still shaky.

There are already a ton of resources out there, videos, blogs, and articles, and some of them are genuinely excellent. I'm not claiming mine will be better. What I am going to try to do is demystify the parts that those resources left unclear for me, share the things I had to figure out on my own because no single resource explained them, and pull all of it together in one place. I'll try to keep things simple while still going deep on every concept, so that ideally you don't have to jump between ten other tabs and end up more confused than when you started.

One heads-up before we begin: a few of these concepts are genuinely hard, and you probably won't understand them on the first read. That's completely normal. My recommendation is to read the article again and give yourself some time to sit with the idea. The researchers who came up with these things spent years on them, so it's unrealistic to expect to absorb everything in one go. We all learn at different speeds. Be patient with yourself.

A couple of things I'll do in every post:

- Link the resources that actually helped me when I was learning the topic.
- Go beyond theory. We'll implement every concept in code.

Last thing, on how this is written. I use Claude to check my grammar and to make sure I'm explaining things the way I intend to. So some of what you read is AI-assisted, but the ideas and the original words are mine. The AI only helps me say them more clearly.

That's the plan. Let's get into it.
