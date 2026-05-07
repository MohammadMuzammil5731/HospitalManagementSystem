import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Printer, X } from 'lucide-react';
import { toast } from 'sonner';
import realClinicAPI from '@/services/realApi';

interface Medication {
  name: string;
  genericName?: string;
  dosage: string;
  strength?: string;
  frequency: string;
  duration: string;
  quantity: number;
  unit: string;
  timing: string;
  instructions?: string;
  refills: number;
}

interface PrescriptionFormProps {
  prescription?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({
  prescription,
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    patient: prescription?.patient?._id || '',
    appointment: prescription?.appointment?._id || '',
    diagnosis: {
      primary: prescription?.diagnosis?.primary || '',
      secondary: prescription?.diagnosis?.secondary || [],
      icd10Code: prescription?.diagnosis?.icd10Code || '',
      notes: prescription?.diagnosis?.notes || ''
    },
    medications: prescription?.medications || [{
      name: '',
      genericName: '',
      dosage: '',
      strength: '',
      frequency: '',
      duration: '',
      quantity: 1,
      unit: 'tablets',
      timing: 'After Meals',
      instructions: '',
      refills: 0
    }],
    symptoms: prescription?.symptoms || [],
    vitalSigns: prescription?.vitalSigns || {},
    allergies: prescription?.allergies || [],
    instructions: prescription?.instructions || '',
    followUp: {
      required: prescription?.followUp?.required || false,
      suggestedDate: prescription?.followUp?.suggestedDate || '',
      reason: prescription?.followUp?.reason || '',
      notes: prescription?.followUp?.notes || ''
    },
    labTests: prescription?.labTests || [],
    imaging: prescription?.imaging || []
  });

  const [patients, setPatients] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatients();
    if (formData.patient) {
      fetchAppointments(formData.patient);
    }
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await realClinicAPI.getPatients();
      setPatients(response.patients || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchAppointments = async (patientId: string) => {
    try {
      const response = await realClinicAPI.getAppointments({ patient: patientId });
      setAppointments(response.appointments || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (prescription) {
        await realClinicAPI.updatePrescription(prescription._id, formData);
        toast.success('Prescription updated successfully');
      } else {
        await realClinicAPI.createPrescription(formData);
        toast.success('Prescription created successfully');
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving prescription:', error);
      toast.error('Failed to save prescription');
    } finally {
      setLoading(false);
    }
  };

  const addMedication = () => {
    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, {
        name: '',
        genericName: '',
        dosage: '',
        strength: '',
        frequency: '',
        duration: '',
        quantity: 1,
        unit: 'tablets',
        timing: 'After Meals',
        instructions: '',
        refills: 0
      }]
    }));
  };

  const removeMedication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const updateMedication = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const addSymptom = () => {
    setFormData(prev => ({
      ...prev,
      symptoms: [...prev.symptoms, { symptom: '', severity: 'Mild', duration: '' }]
    }));
  };

  const removeSymptom = (index: number) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.filter((_, i) => i !== index)
    }));
  };

  const updateSymptom = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.map((symptom, i) => 
        i === index ? { ...symptom, [field]: value } : symptom
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Patient and Appointment Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patient">Patient *</Label>
              <Select
                value={formData.patient}
                onValueChange={(value) => {
                  setFormData(prev => ({ ...prev, patient: value }));
                  fetchAppointments(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient._id} value={patient._id}>
                      {patient.firstName} {patient.lastName} ({patient.patientId})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="appointment">Appointment *</Label>
              <Select
                value={formData.appointment}
                onValueChange={(value) => setFormData(prev => ({ ...prev, appointment: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select appointment" />
                </SelectTrigger>
                <SelectContent>
                  {appointments.map((appointment) => (
                    <SelectItem key={appointment._id} value={appointment._id}>
                      {new Date(appointment.appointmentDate).toLocaleDateString()} - {appointment.appointmentTime}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diagnosis */}
      <Card>
        <CardHeader>
          <CardTitle>Diagnosis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="primaryDiagnosis">Primary Diagnosis *</Label>
            <Input
              id="primaryDiagnosis"
              value={formData.diagnosis.primary}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                diagnosis: { ...prev.diagnosis, primary: e.target.value }
              }))}
              placeholder="Enter primary diagnosis"
              required
            />
          </div>
          <div>
            <Label htmlFor="icd10Code">ICD-10 Code</Label>
            <Input
              id="icd10Code"
              value={formData.diagnosis.icd10Code}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                diagnosis: { ...prev.diagnosis, icd10Code: e.target.value }
              }))}
              placeholder="Enter ICD-10 code"
            />
          </div>
          <div>
            <Label htmlFor="diagnosisNotes">Diagnosis Notes</Label>
            <Textarea
              id="diagnosisNotes"
              value={formData.diagnosis.notes}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                diagnosis: { ...prev.diagnosis, notes: e.target.value }
              }))}
              placeholder="Additional diagnosis notes"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Symptoms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Symptoms
            <Button type="button" variant="outline" size="sm" onClick={addSymptom}>
              <Plus className="h-4 w-4 mr-2" />
              Add Symptom
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.symptoms.map((symptom, index) => (
            <div key={index} className="flex gap-4 items-end">
              <div className="flex-1">
                <Label>Symptom</Label>
                <Input
                  value={symptom.symptom}
                  onChange={(e) => updateSymptom(index, 'symptom', e.target.value)}
                  placeholder="Enter symptom"
                />
              </div>
              <div className="w-32">
                <Label>Severity</Label>
                <Select
                  value={symptom.severity}
                  onValueChange={(value) => updateSymptom(index, 'severity', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mild">Mild</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-32">
                <Label>Duration</Label>
                <Input
                  value={symptom.duration}
                  onChange={(e) => updateSymptom(index, 'duration', e.target.value)}
                  placeholder="e.g., 3 days"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeSymptom(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Medications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Medications
            <Button type="button" variant="outline" size="sm" onClick={addMedication}>
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.medications.map((medication, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Medication {index + 1}</h4>
                {formData.medications.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeMedication(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Medication Name *</Label>
                  <Input
                    value={medication.name}
                    onChange={(e) => updateMedication(index, 'name', e.target.value)}
                    placeholder="Enter medication name"
                    required
                  />
                </div>
                <div>
                  <Label>Generic Name</Label>
                  <Input
                    value={medication.genericName}
                    onChange={(e) => updateMedication(index, 'genericName', e.target.value)}
                    placeholder="Enter generic name"
                  />
                </div>
                <div>
                  <Label>Dosage *</Label>
                  <Input
                    value={medication.dosage}
                    onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                    placeholder="e.g., 500mg"
                    required
                  />
                </div>
                <div>
                  <Label>Strength</Label>
                  <Input
                    value={medication.strength}
                    onChange={(e) => updateMedication(index, 'strength', e.target.value)}
                    placeholder="e.g., 250mg/5ml"
                  />
                </div>
                <div>
                  <Label>Frequency *</Label>
                  <Input
                    value={medication.frequency}
                    onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                    placeholder="e.g., Twice daily"
                    required
                  />
                </div>
                <div>
                  <Label>Duration *</Label>
                  <Input
                    value={medication.duration}
                    onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                    placeholder="e.g., 7 days"
                    required
                  />
                </div>
                <div>
                  <Label>Quantity *</Label>
                  <Input
                    type="number"
                    value={medication.quantity}
                    onChange={(e) => updateMedication(index, 'quantity', parseInt(e.target.value) || 1)}
                    min="1"
                    required
                  />
                </div>
                <div>
                  <Label>Unit</Label>
                  <Select
                    value={medication.unit}
                    onValueChange={(value) => updateMedication(index, 'unit', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tablets">Tablets</SelectItem>
                      <SelectItem value="capsules">Capsules</SelectItem>
                      <SelectItem value="ml">ML</SelectItem>
                      <SelectItem value="mg">MG</SelectItem>
                      <SelectItem value="g">G</SelectItem>
                      <SelectItem value="units">Units</SelectItem>
                      <SelectItem value="puffs">Puffs</SelectItem>
                      <SelectItem value="patches">Patches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Timing</Label>
                  <Select
                    value={medication.timing}
                    onValueChange={(value) => updateMedication(index, 'timing', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Before Meals">Before Meals</SelectItem>
                      <SelectItem value="After Meals">After Meals</SelectItem>
                      <SelectItem value="With Meals">With Meals</SelectItem>
                      <SelectItem value="Empty Stomach">Empty Stomach</SelectItem>
                      <SelectItem value="At Bedtime">At Bedtime</SelectItem>
                      <SelectItem value="As Needed">As Needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Refills</Label>
                  <Input
                    type="number"
                    value={medication.refills}
                    onChange={(e) => updateMedication(index, 'refills', parseInt(e.target.value) || 0)}
                    min="0"
                    max="5"
                  />
                </div>
              </div>
              
              <div>
                <Label>Instructions</Label>
                <Textarea
                  value={medication.instructions}
                  onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                  placeholder="Special instructions for this medication"
                  rows={2}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* General Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>General Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
              placeholder="General instructions for the patient"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Follow-up */}
      <Card>
        <CardHeader>
          <CardTitle>Follow-up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="followUpRequired"
              checked={formData.followUp.required}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                followUp: { ...prev.followUp, required: e.target.checked }
              }))}
            />
            <Label htmlFor="followUpRequired">Follow-up required</Label>
          </div>
          
          {formData.followUp.required && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="followUpDate">Suggested Date</Label>
                <Input
                  id="followUpDate"
                  type="date"
                  value={formData.followUp.suggestedDate}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    followUp: { ...prev.followUp, suggestedDate: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="followUpReason">Reason</Label>
                <Input
                  id="followUpReason"
                  value={formData.followUp.reason}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    followUp: { ...prev.followUp, reason: e.target.value }
                  }))}
                  placeholder="Reason for follow-up"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : (prescription ? 'Update Prescription' : 'Create Prescription')}
        </Button>
      </div>
    </form>
  );
};

export default PrescriptionForm;
