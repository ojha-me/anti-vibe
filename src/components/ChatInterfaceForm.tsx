// src/components/CreateTopicForm.tsx
'use client'; // Mark this as a Client Component because it uses hooks (useState, useForm)

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button'; // Import Shadcn Button
import { Input } from '@/components/ui/input';   // Import Shadcn Input
import { Label } from '@/components/ui/label';   // Import Shadcn Label
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Optional: for styling
import { GoogleGenAI } from "@google/genai";

// Define the shape of our form data
type FormData = {
  topicTitle: string;
};

const ai = new GoogleGenAI({ apiKey: "here was my api key befre" });

const CreateTopicForm = () => {
  const [aiResponse, setAiResponse] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState(false); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
setAiResponse(null); // Clear previous response
    console.log('Form submitted:', data);

    // --- TODO: Replace this with actual API call ---
    // Simulate network delay
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: data.topicTitle,
      });

    console.log('AI response:', response);
    const actualContent = response.candidates[0].content?.parts[0].text;
    setAiResponse(actualContent); // Set the AI response to state

    setIsLoading(false);
    reset(); // Clear the form input field after successful submission
  };



  return (
    <Card className="w-full max-w-md"> {/* Optional Card wrapper */}
      <CardHeader>
        <CardTitle>What do you want to learn?</CardTitle>
        <CardDescription>Enter a technical concept you want to understand deeply.</CardDescription>
      </CardHeader>
      {/* Pass the handleSubmit wrapper to the form's onSubmit */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topicTitle">Topic Title</Label>
            <Input
              id="topicTitle"
              placeholder="e.g., JavaScript Closures, GCP IAM Roles"
              // Register the input with React Hook Form
              // Add validation rules (e.g., required)
              {...register('topicTitle', { required: 'Please enter a topic title.' })}
              aria-invalid={errors.topicTitle ? "true" : "false"}
            />
            {/* Display validation errors */}
            {errors.topicTitle && (
              <p className="text-sm font-medium text-destructive" role="alert">
                {errors.topicTitle.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4">
           <Button type="submit" disabled={isLoading}>
             {isLoading ? 'Thinking...' : 'Start Learning'}
           </Button>

           {/* Display the simulated AI response */}
           {aiResponse && !isLoading && (
             <div className="mt-4 p-4 w-full bg-muted rounded text-muted-foreground">
               <p><strong>Mentor Bot:</strong></p>
               <p>{aiResponse}</p>
             </div>
           )}
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateTopicForm;