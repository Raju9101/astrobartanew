'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createCallRequest } from '@/app/actions';

interface CallRequestDialogProps {
  trigger: React.ReactNode;
}

const callRequestSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your full name.' }),
  phone_number: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  note: z.string().optional(),
});

type CallRequestFormValues = z.infer<typeof callRequestSchema>;

export function CallRequestDialog({ trigger }: CallRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<CallRequestFormValues>({
    resolver: zodResolver(callRequestSchema),
    defaultValues: {
      name: '',
      phone_number: '',
      note: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestResult, setRequestResult] = useState<{success: boolean, message: string} | null>(null);

  const processForm: SubmitHandler<CallRequestFormValues> = async (data) => {
    setIsSubmitting(true);
    setRequestResult(null);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone_number', data.phone_number);
    formData.append('note', data.note || '');

    const result = await createCallRequest(undefined, formData);

    if (result.success) {
      setRequestResult({ success: true, message: result.message });
      form.reset();
    } else {
      toast({
        title: 'Request Failed',
        description: result.message,
        variant: 'destructive',
      });
      setRequestResult(null);
    }
    setIsSubmitting(false);
  };

  const resetDialog = () => {
    setOpen(false);
    setTimeout(() => {
        setRequestResult(null);
        form.reset({
             name: '',
             phone_number: '',
             note: '',
        });
    }, 300);
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if(!o) { resetDialog() } else { setOpen(true) } }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {requestResult?.success ? (
          <div className="flex flex-col items-center justify-center text-center p-8 gap-4">
             <PartyPopper className="w-16 h-16 text-primary" />
             <DialogTitle className="text-2xl">Request Submitted!</DialogTitle>
             <p className="text-muted-foreground">{requestResult.message}</p>
             <Button onClick={resetDialog} className="mt-4">Done</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request a Call</DialogTitle>
              <DialogDescription>
                Fill in your details below and we'll connect you with an astrologer.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(processForm)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any specific questions you have..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting} className='w-full'>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Request
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
