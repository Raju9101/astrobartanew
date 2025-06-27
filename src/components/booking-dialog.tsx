'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';

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
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createBooking } from '@/app/actions';

interface Astrologer {
  id: number;
  name: string;
}

interface BookingDialogProps {
  astrologer: Astrologer;
  trigger: React.ReactNode;
}

const bookingSchema = z.object({
  astrologer_id: z.number(),
  name: z.string().min(2, { message: 'Please enter your full name.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone_number: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  address: z.string().min(5, { message: 'Please enter your address.' }),
  session_book_date: z.date({ required_error: 'Please select a date.' }),
  session_book_time: z.string({ required_error: 'Please select a time slot.' }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

// Time slots generation
const timeSlots = Array.from({ length: 20 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
});

export function BookingDialog({ astrologer, trigger }: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      astrologer_id: astrologer.id,
      name: '',
      email: '',
      phone_number: '',
      address: '',
      session_book_time: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<{success: boolean, message: string} | null>(null);

  const processForm: SubmitHandler<BookingFormValues> = async (data) => {
    setIsSubmitting(true);
    setBookingResult(null);

    const formData = new FormData();
    formData.append('astrologer_id', String(data.astrologer_id));
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone_number', data.phone_number);
    formData.append('address', data.address);
    formData.append('session_book_date', format(data.session_book_date, 'yyyy-MM-dd'));
    formData.append('session_book_time', data.session_book_time);

    const result = await createBooking(undefined, formData);

    if (result.success) {
      setBookingResult({ success: true, message: result.message });
      form.reset();
    } else {
      toast({
        title: 'Booking Failed',
        description: result.message,
        variant: 'destructive',
      });
      setBookingResult(null);
    }
    setIsSubmitting(false);
  };


  const handleNextStep = async () => {
    const fieldsToValidate: (keyof BookingFormValues)[] = ['name', 'email', 'phone_number', 'address'];
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(2);
    }
  };

  const resetDialog = () => {
    setOpen(false);
    setTimeout(() => {
        setStep(1);
        setBookingResult(null);
        form.reset({
             astrologer_id: astrologer.id,
             name: '',
             email: '',
             phone_number: '',
             address: '',
             session_book_time: '',
        });
    }, 300);
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if(!o) { resetDialog() } else { setOpen(true) } }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {bookingResult?.success ? (
          <div className="flex flex-col items-center justify-center text-center p-8 gap-4">
             <PartyPopper className="w-16 h-16 text-primary" />
             <DialogTitle className="text-2xl">Booking Confirmed!</DialogTitle>
             <p className="text-muted-foreground">{bookingResult.message}</p>
             <Button onClick={resetDialog} className="mt-4">Done</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Book a Session with {astrologer.name}</DialogTitle>
              <DialogDescription>
                Step {step} of 2: {step === 1 ? 'Your Information' : 'Schedule Your Session'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(processForm)} className="space-y-4">
                <div className={step === 1 ? 'block' : 'hidden'}>
                  <div className="space-y-3 py-4">
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
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
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Cosmos Lane, Star City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className={step === 2 ? 'block' : 'hidden'}>
                    <div className="space-y-4 py-4">
                         <FormField
                            control={form.control}
                            name="session_book_date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center">
                                    <FormLabel>Select a Date</FormLabel>
                                    <FormControl>
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                                            initialFocus
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="session_book_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select a Time</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="--:-- --" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                             {timeSlots.map(slot => (
                                                <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <DialogFooter>
                  {step === 1 && (
                    <Button type="button" onClick={handleNextStep}>
                      Next
                    </Button>
                  )}
                  {step === 2 && (
                    <>
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm Booking
                      </Button>
                    </>
                  )}
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
