"use client";

import { useFormStatus } from "react-dom";
import { findMyAstrologer } from "@/app/actions";
import { useEffect, useActionState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Finding Match...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Find My Astrologer
        </>
      )}
    </Button>
  );
}

export function AIMatcherForm() {
  const initialState = { message: "", error: undefined, result: undefined };
  const [state, formAction] = useActionState(findMyAstrologer, initialState);
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
          <Textarea
            name="query"
            placeholder="e.g., 'I'm feeling lost in my career and need guidance' or 'What do the stars say about my love life?'"
            className="min-h-[120px] text-base"
            required
          />
          <div className="flex justify-center">
            <SubmitButton />
          </div>
        </form>
        {state.result && (
          <div className="mt-6">
            <Card className="bg-background">
              <CardHeader>
                <CardTitle>Your Recommended Astrologers</CardTitle>
                <CardDescription>{state.result.reasoning}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside">
                  {state.result.recommendedAstrologers.map((name, index) => (
                    <li key={index} className="font-semibold">{name}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
