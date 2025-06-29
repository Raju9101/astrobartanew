"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { getDailyHoroscope } from "@/app/actions";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const HoroscopeSchema = z.object({
  zodiacSign: z.string().min(1, { message: "Please select a zodiac sign." }),
});

type HoroscopeFormValues = z.infer<typeof HoroscopeSchema>;

interface HoroscopeState {
  horoscope?: string;
  zodiacSign?: string;
  error?: string;
}

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export function AIMatcherForm() {
  const [state, setState] = useState<HoroscopeState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<HoroscopeFormValues>({
    resolver: zodResolver(HoroscopeSchema),
    defaultValues: {
      zodiacSign: "",
    },
  });

  useEffect(() => {
    if (state.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state.error, toast]);

  const onSubmit: SubmitHandler<HoroscopeFormValues> = async (data) => {
    setIsSubmitting(true);
    setState({}); // Clear previous state

    const formData = new FormData();
    formData.append("zodiacSign", data.zodiacSign);
    
    const result = await getDailyHoroscope(undefined, formData);
    
    setState(result);
    setIsSubmitting(false);

    if (result.error) {
      form.reset({ zodiacSign: data.zodiacSign });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="zodiacSign"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Your Zodiac Sign</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} required>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="-- Select Sign --" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {zodiacSigns.map(sign => (
                        <SelectItem key={sign} value={sign}>{sign}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? (
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
            </div>
          </form>
        </Form>
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
