"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, Check } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

export function CalendarBooking() {
  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [isBooked, setIsBooked] = useState(false)

  const handleBooking = () => {
    if (date && selectedTime) {
      setIsBooked(true)
      // Here you would send the booking data to your backend
      console.log("Booking:", { date, time: selectedTime })

      // Reset after 3 seconds
      setTimeout(() => {
        setIsBooked(false)
        setDate(undefined)
        setSelectedTime(undefined)
      }, 3000)
    }
  }

  return (
    <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border/50">
      <h3 className="text-2xl font-bold mb-4">Prendre rendez-vous</h3>
      <p className="text-muted-foreground mb-6">
        Planifiez un rendez-vous pour discuter de votre projet ou pour un entretien.
      </p>

      <div className="space-y-6">
        {/* Date Picker */}
        <div>
          <label className="text-sm font-medium mb-2 block">Choisir une date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal bg-background/50">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: fr }) : "Sélectionner une date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Slots */}
        {date && (
          <div className="animate-fade-in-up">
            <label className="text-sm font-medium mb-3 block">Choisir un créneau</label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className={
                    selectedTime === time
                      ? "bg-gradient-to-r from-purple to-pink-500 hover:opacity-90 text-white"
                      : "border-border/50 hover:bg-muted"
                  }
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Booking Button */}
        {date && selectedTime && (
          <Button
            onClick={handleBooking}
            disabled={isBooked}
            className="w-full bg-gradient-to-r from-cyan to-purple hover:opacity-90 text-white"
            size="lg"
          >
            {isBooked ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                Rendez-vous confirmé !
              </>
            ) : (
              <>
                <CalendarIcon className="mr-2 h-5 w-5" />
                Confirmer le rendez-vous
              </>
            )}
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">Disponibilité : Lundi - Vendredi, 9h - 18h</p>
    </Card>
  )
}
