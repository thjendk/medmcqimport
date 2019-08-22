# WF-scripts

Dette er en samling scripts, der konverterer et WiseFlow-eksport til en struktur, medMCQ kan håndtere.

## Input

Skal være en `json`-fil indeholdende et array af flows (se [src/Interfaces/Flow.ts](src/Interfaces/Flow.ts) for strukturen).

## Output

Er en graph af følgende struktur (se [src/utils/parseFlow.ts](src/utils/parseFlow.ts) for detaljer):

```
{
    semesterId,
    season,
    year,
    question: [
        {
            text,
            answer1,
            answer2,
            answer3,
            image,
            correctAnswers: [
                { answer }
            ],
            examSetQno
        }
    ]

}
```

Filerne gemmes i `output`-mappen sammen med evt. billeder.

## Brug

1. `npm install`
2. `npm run build`
3. `node run convert`
