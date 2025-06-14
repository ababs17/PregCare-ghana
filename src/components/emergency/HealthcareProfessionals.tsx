
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Phone, Mail, Star, Edit, Trash2, AlertCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const professionalSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  specialization: z.string().min(2, "Specialization is required"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  emergency_phone: z.string().optional(),
  license_number: z.string().optional(),
  notes: z.string().optional(),
  is_primary: z.boolean().default(false),
});

type Professional = z.infer<typeof professionalSchema> & {
  id: string;
  created_at: string;
};

const HealthcareProfessionals = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof professionalSchema>>({
    resolver: zodResolver(professionalSchema),
    defaultValues: {
      name: "",
      specialization: "",
      phone: "",
      email: "",
      emergency_phone: "",
      license_number: "",
      notes: "",
      is_primary: false,
    },
  });

  const fetchProfessionals = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('healthcare_professionals')
        .select('*')
        .eq('user_id', user.id)
        .order('is_primary', { ascending: false })
        .order('created_at', { ascending: true });

      if (error) throw error;
      setProfessionals(data || []);
    } catch (error) {
      console.error('Error fetching professionals:', error);
      toast({
        title: "Error",
        description: "Failed to fetch healthcare professionals.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, [user]);

  const onSubmit = async (values: z.infer<typeof professionalSchema>) => {
    if (!user) return;

    try {
      const professionalData = {
        user_id: user.id,
        name: values.name,
        specialization: values.specialization,
        phone: values.phone,
        email: values.email || null,
        emergency_phone: values.emergency_phone || null,
        license_number: values.license_number || null,
        notes: values.notes || null,
        is_primary: values.is_primary,
      };

      if (editingProfessional) {
        const { error } = await supabase
          .from('healthcare_professionals')
          .update(professionalData)
          .eq('id', editingProfessional.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Healthcare professional updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('healthcare_professionals')
          .insert([professionalData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Healthcare professional added successfully.",
        });
      }

      setIsDialogOpen(false);
      setEditingProfessional(null);
      form.reset();
      fetchProfessionals();
    } catch (error) {
      console.error('Error saving professional:', error);
      toast({
        title: "Error",
        description: "Failed to save healthcare professional.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (professional: Professional) => {
    setEditingProfessional(professional);
    form.reset({
      name: professional.name,
      specialization: professional.specialization,
      phone: professional.phone,
      email: professional.email || "",
      emergency_phone: professional.emergency_phone || "",
      license_number: professional.license_number || "",
      notes: professional.notes || "",
      is_primary: professional.is_primary,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this healthcare professional?")) return;

    try {
      const { error } = await supabase
        .from('healthcare_professionals')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Healthcare professional deleted successfully.",
      });
      fetchProfessionals();
    } catch (error) {
      console.error('Error deleting professional:', error);
      toast({
        title: "Error",
        description: "Failed to delete healthcare professional.",
        variant: "destructive",
      });
    }
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`);
  };

  const specializations = [
    "Obstetrician/Gynecologist",
    "Midwife",
    "General Practitioner",
    "Pediatrician",
    "Cardiologist",
    "Endocrinologist",
    "Psychiatrist",
    "Nutritionist",
    "Physiotherapist",
    "Other"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Healthcare Team</h2>
          <p className="text-gray-600">Manage your healthcare professionals for emergencies</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Professional
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProfessional ? 'Edit Healthcare Professional' : 'Add Healthcare Professional'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Dr. Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialization *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select specialization" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {specializations.map((spec) => (
                              <SelectItem key={spec} value={spec}>
                                {spec}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+233 XX XXX XXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergency_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+233 XX XXX XXXX" {...field} />
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
                          <Input placeholder="doctor@hospital.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="license_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Number</FormLabel>
                        <FormControl>
                          <Input placeholder="License/Registration number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional notes about this healthcare professional..."
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingProfessional(null);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingProfessional ? 'Update' : 'Add'} Professional
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Professionals List */}
      <div className="grid gap-4">
        {professionals.map((professional) => (
          <Card key={professional.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">🩺</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg text-gray-900">{professional.name}</h3>
                        {professional.is_primary && (
                          <Badge className="bg-blue-100 text-blue-800">
                            <Star className="w-3 h-3 mr-1" />
                            Primary
                          </Badge>
                        )}
                      </div>
                      <p className="text-blue-600 font-medium">{professional.specialization}</p>
                      {professional.license_number && (
                        <p className="text-sm text-gray-500">License: {professional.license_number}</p>
                      )}
                    </div>
                  </div>
                  
                  {professional.notes && (
                    <p className="text-gray-600 mb-3 text-sm bg-gray-50 p-2 rounded">
                      {professional.notes}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {professional.phone}
                    </span>
                    {professional.email && (
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {professional.email}
                      </span>
                    )}
                    {professional.emergency_phone && (
                      <span className="flex items-center text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Emergency: {professional.emergency_phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:min-w-[200px]">
                  <Button 
                    onClick={() => handleCall(professional.phone)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  {professional.emergency_phone && (
                    <Button 
                      onClick={() => handleCall(professional.emergency_phone)}
                      variant="destructive"
                      size="sm"
                      className="w-full"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Emergency Call
                    </Button>
                  )}
                  {professional.email && (
                    <Button 
                      onClick={() => handleEmail(professional.email!)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  )}
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleEdit(professional)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={() => handleDelete(professional.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {professionals.length === 0 && !loading && (
        <Card>
          <CardContent className="p-6 text-center">
            <span className="text-6xl mb-4 block">🩺</span>
            <p className="text-gray-500 mb-2">No healthcare professionals added yet.</p>
            <p className="text-sm text-gray-400">Add your doctors, midwives, and other healthcare providers for quick access during emergencies.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HealthcareProfessionals;
