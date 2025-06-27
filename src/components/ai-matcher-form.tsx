"use client";

import { useFormStatus } from "react-dom";
import { getDailyHoroscope } from "@/app/actions";
import { useEffect, useActionState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Consulting the Cosmos...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Get My Horoscope
        </>
      )}
    </Button>
  );
}

export function AIMatcherForm() {
  const initialState = { horoscope: undefined, zodiacSign: undefined, error: undefined };
  const [state, formAction] = useActionState(getDailyHoroscope, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state.error, toast]);

  return (
    <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="p-6">
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="zodiac-sign">Select Your Zodiac Sign</Label>
             <Select name="zodiacSign" required>
                <SelectTrigger id="zodiac-sign" className="w-full">
                  <SelectValue placeholder="-- Select Sign --" />
                </SelectTrigger>
                <SelectContent>
                  {zodiacSigns.map(sign => (
                    <SelectItem key={sign} value={sign}>{sign}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>
          <div className="flex justify-center">
            <SubmitButton />
          </div>
        </form>
        {state.horoscope && state.zodiacSign && (
          <div className="mt-6">
            <Card className="bg-background">
              <CardHeader>
                <CardTitle>Today's Horoscope for {state.zodiacSign}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{state.horoscope}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
