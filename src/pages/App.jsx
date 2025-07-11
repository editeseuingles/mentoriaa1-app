
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const exercises = [
  {
    id: 1,
    type: "text",
    question: "Escreva uma breve apresentação sobre você.",
    time: 60,
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Qual destas palavras é um verbo?",
    options: ["mesa", "correr", "feliz", "azul"],
    answer: "correr",
    time: 45,
  },
  {
    id: 3,
    type: "link",
    url: "https://www.youtube.com/watch?v=abcd1234",
    question: "Assista ao vídeo e escreva as três palavras principais.",
    time: 90,
  },
];

export default function MentoriaApp() {
  const [step, setStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0].time);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (timeLeft === 0) {
      setStep((prev) => prev + 1);
      setAnswer("");
      if (exercises[step + 1]) setTimeLeft(exercises[step + 1].time);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, step]);

  const current = exercises[step];
  if (!current) return <p className="p-4 text-center">Fim da sessão!</p>;

  return (
    <div className="p-4 text-white bg-black min-h-screen">
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-bold">Exercício {step + 1}</h2>
          <p>{current.question}</p>
          <p className="text-sm">Tempo restante: {timeLeft}s</p>

          {current.type === "text" && (
            <textarea
              className="w-full p-2 text-black"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          )}

          {current.type === "multiple_choice" && (
            <div className="space-y-2">
              {current.options.map((opt) => (
                <Button
                  key={opt}
                  className="w-full"
                  variant="outline"
                  onClick={() => setAnswer(opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          )}

          {current.type === "link" && (
            <div>
              <a
                href={current.url}
                target="_blank"
                className="underline text-blue-300"
                rel="noopener noreferrer"
              >
                Clique aqui para abrir o exercício externo
              </a>
              <textarea
                className="w-full p-2 text-black mt-4"
                placeholder="Escreva sua resposta aqui..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
