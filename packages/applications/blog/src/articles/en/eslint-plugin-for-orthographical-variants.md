---
title: ESLint plugin to ban orthographical variants in code
tags: [Programming, JavaScript, DX, Frontend]
description: I made ESLint plugin to ban orthographical variants in code so introduce it.
publishedAt: 2022/03/15
updatedAt: 2022/03/15
---

## What is this

I created an ESLint Plugin to ban orthographical variants in code. I realized that the cost-effectiveness of this plugin was not good when I wrote some tests for this plugin, and I gave birth to a monster that is neither interesting nor technically great nor convenient. This blog post is a grave marker for this monster.

## Summary of this plugin

As mentioned above, this is an ESLint Plugin that binds the orthographical variants in code.

https://github.com/Shinyaigeek/eslint-plugin-ban-orthographical-variant

```json
{
    "Audio": {
        "synonyms": ["Speech", "Music"]
    },
    "Video": {
        "synonyms": ["Movie", "TV Show", "Game", "Animation", "Documentary"]
    },
    "Image": {
        "synonyms": ["Photo", "Drawing", "Painting", "Photograph", "Illustration"]
    }
}
```

if you prepare the dictionary file json such above,

```javascript
const audioPath = 'hoge'; // ok
const musicPath = 'hoge'; // warning!
```

This ESLint Plugin will bind such orthographical variants in JavaScript/TypeScript code. I think this plugin could support almost of the case (but perhaps, there is an omission).

-   Variable name
-   Function name
-   Class name
-   Method name
-   Enum name
-   Interface name
-   etc...

I think I've probably covered most of them.

## Motivation

An orthographical variant is not rare, in specially in the codebase made by multiple people, but we are an engineer and intend to find meaning in anything, also in just an orthographical variant, and it also reduces the search-ability. It is also common that a word in a business domain becomes another word in a codebase, which makes it a mystery for newcomers to the project.

In the first place, existing a lot of the term on a business domain brings difficulty, so in some case we have been enforced to manage such terms in a dictionary file. I thought it will be cool to ban bothering orthographical variants via managing such a dictionary file, so I created this plugin.

## How to

It is really easy but...

1. Access a specific Node in AST
2. get variable name
3. check it whether it is an orthographical variant.

```typescript
    VariableDeclarator(node) {
        const identifier = node.id;

        const variableNames = getVariableNameFromBindingName(identifier);

        const dictionaryPath = getDictionaryPath(options[0].dictionaryPath);
        const dictionary = getDictionary(dictionaryPath);
        for (const variableName of variableNames) {
          lintWithVariable(
            variableName,
            dictionary,
            (originWord, synomsysWord) =>
              report({
                node,
                messageId: "banOrthographicalVariant",
                data: {
                  originWord,
                  synomsysWord,
                },
              })
          );
        }
      },
```

The above code is just an example. It accesses the node of VariableDeclarator (=variable declaration).

In VariableDeclarator, `node.id` can be the one of

-   `Identifier`

```javascript
const hoge = 'hoge';
```

-   `ArrayPattern`

```javascript
const [hoge] = ['hoge'];
```

-   `ObjectPattern`

```javascript
const { hoge } = { hoge: 'hoge' };
```

Get variable names in each case. (`ObjectPattern` and `ArrayPattern` are sometimes nested, so I needed to get them recursively).

All that is left is to load the dictionary file and judge if it is a orthographical variant or not.

If you want to see how it works, please check out test cases. https://github.com/Shinyaigeek/eslint-plugin-ban-orthographical-variant/blob/main/src/__tests__/ban-orthographical-variant.test.ts

## Why not is this needed?

When I was writing a dictionary file for mock for testing, I realized that I didn't want to write a dictionary file in the first place, so I think I should have hacked here.
