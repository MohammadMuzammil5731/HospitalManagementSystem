import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Printer, Download, X } from 'lucide-react';

interface PrescriptionViewProps {
  prescription: any;
  onPrint: () => void;
  onClose: () => void;
}

const PrescriptionView: React.FC<PrescriptionViewProps> = ({
  prescription,
  onPrint,
  onClose
}) => {
  const handlePrint = () => {
    // Create a printable version of the prescription
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const printContent = generatePrintContent(prescription);
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
    onPrint();
  };

  const generatePrintContent = (prescription: any) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Prescription - ${prescription.prescriptionId}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .clinic-name {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .prescription-id {
              font-size: 18px;
              color: #666;
            }
            .section {
              margin-bottom: 25px;
            }
            .section-title {
              font-size: 16px;
              font-weight: bold;
              background-color: #f5f5f5;
              padding: 8px;
              margin-bottom: 10px;
            }
            .patient-info, .doctor-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            .medication {
              border: 1px solid #ddd;
              padding: 15px;
              margin-bottom: 15px;
              border-radius: 5px;
            }
            .medication-name {
              font-weight: bold;
              font-size: 16px;
              margin-bottom: 8px;
            }
            .medication-details {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              border-top: 1px solid #ddd;
              padding-top: 20px;
            }
            .signature-line {
              margin-top: 30px;
              border-bottom: 1px solid #333;
              width: 200px;
              margin-left: auto;
              margin-right: auto;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="clinic-name">MEDICAL CLINIC</div>
            <div>123 Healthcare Street, Medical City, MC 12345</div>
            <div>Phone: (555) 123-4567 | Email: info@medicalclinic.com</div>
            <div class="prescription-id">Prescription ID: ${prescription.prescriptionId}</div>
          </div>

          <div class="patient-info">
            <div>
              <strong>Patient:</strong> ${prescription.patient.firstName} ${prescription.patient.lastName}<br>
              <strong>Patient ID:</strong> ${prescription.patient.patientId}<br>
              <strong>Date:</strong> ${new Date(prescription.createdAt).toLocaleDateString()}
            </div>
            <div>
              <strong>Doctor:</strong> Dr. ${prescription.doctor.firstName} ${prescription.doctor.lastName}<br>
              <strong>Specialization:</strong> ${prescription.doctor.specialization}<br>
              <strong>License:</strong> ${prescription.doctor.licenseNumber || 'N/A'}
            </div>
          </div>

          <div class="section">
            <div class="section-title">DIAGNOSIS</div>
            <div><strong>Primary:</strong> ${prescription.diagnosis.primary}</div>
            ${prescription.diagnosis.secondary && prescription.diagnosis.secondary.length > 0 ? 
              `<div><strong>Secondary:</strong> ${prescription.diagnosis.secondary.join(', ')}</div>` : ''}
            ${prescription.diagnosis.icd10Code ? 
              `<div><strong>ICD-10 Code:</strong> ${prescription.diagnosis.icd10Code}</div>` : ''}
            ${prescription.diagnosis.notes ? 
              `<div><strong>Notes:</strong> ${prescription.diagnosis.notes}</div>` : ''}
          </div>

          <div class="section">
            <div class="section-title">MEDICATIONS</div>
            ${prescription.medications.map((med: any, index: number) => `
              <div class="medication">
                <div class="medication-name">${index + 1}. ${med.name} ${med.genericName ? `(${med.genericName})` : ''}</div>
                <div class="medication-details">
                  <div><strong>Dosage:</strong> ${med.dosage} ${med.strength ? `(${med.strength})` : ''}</div>
                  <div><strong>Frequency:</strong> ${med.frequency}</div>
                  <div><strong>Duration:</strong> ${med.duration}</div>
                  <div><strong>Quantity:</strong> ${med.quantity} ${med.unit}</div>
                  <div><strong>Timing:</strong> ${med.timing}</div>
                  <div><strong>Refills:</strong> ${med.refills}</div>
                </div>
                ${med.instructions ? `<div><strong>Instructions:</strong> ${med.instructions}</div>` : ''}
              </div>
            `).join('')}
          </div>

          ${prescription.symptoms && prescription.symptoms.length > 0 ? `
            <div class="section">
              <div class="section-title">SYMPTOMS</div>
              ${prescription.symptoms.map((symptom: any) => `
                <div>• ${symptom.symptom} (${symptom.severity}) - ${symptom.duration}</div>
              `).join('')}
            </div>
          ` : ''}

          ${prescription.instructions ? `
            <div class="section">
              <div class="section-title">GENERAL INSTRUCTIONS</div>
              <div>${prescription.instructions}</div>
            </div>
          ` : ''}

          ${prescription.followUp && prescription.followUp.required ? `
            <div class="section">
              <div class="section-title">FOLLOW-UP</div>
              <div><strong>Required:</strong> Yes</div>
              ${prescription.followUp.suggestedDate ? 
                `<div><strong>Suggested Date:</strong> ${new Date(prescription.followUp.suggestedDate).toLocaleDateString()}</div>` : ''}
              ${prescription.followUp.reason ? 
                `<div><strong>Reason:</strong> ${prescription.followUp.reason}</div>` : ''}
              ${prescription.followUp.notes ? 
                `<div><strong>Notes:</strong> ${prescription.followUp.notes}</div>` : ''}
            </div>
          ` : ''}

          <div class="footer">
            <div class="signature-line"></div>
            <div>Doctor's Signature</div>
            <div style="margin-top: 20px;">
              <strong>Important:</strong> This prescription is valid for 30 days from the date of issue.<br>
              Please follow all instructions carefully and contact your doctor if you have any questions.
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'modified':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Prescription Details</h3>
          <p className="text-sm text-muted-foreground">
            ID: {prescription.prescriptionId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(prescription.status)}>
            {prescription.status}
          </Badge>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Patient and Doctor Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Name:</strong> {prescription.patient.firstName} {prescription.patient.lastName}</div>
            <div><strong>Patient ID:</strong> {prescription.patient.patientId}</div>
            <div><strong>Phone:</strong> {prescription.patient.phone || 'N/A'}</div>
            <div><strong>Email:</strong> {prescription.patient.email || 'N/A'}</div>
            {prescription.patient.age && <div><strong>Age:</strong> {prescription.patient.age}</div>}
            {prescription.patient.gender && <div><strong>Gender:</strong> {prescription.patient.gender}</div>}
            {prescription.patient.bloodType && <div><strong>Blood Type:</strong> {prescription.patient.bloodType}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Doctor Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Name:</strong> Dr. {prescription.doctor.firstName} {prescription.doctor.lastName}</div>
            <div><strong>Specialization:</strong> {prescription.doctor.specialization}</div>
            <div><strong>License:</strong> {prescription.doctor.licenseNumber || 'N/A'}</div>
            <div><strong>Date:</strong> {new Date(prescription.createdAt).toLocaleDateString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Diagnosis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Diagnosis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div><strong>Primary:</strong> {prescription.diagnosis.primary}</div>
          {prescription.diagnosis.secondary && prescription.diagnosis.secondary.length > 0 && (
            <div><strong>Secondary:</strong> {prescription.diagnosis.secondary.join(', ')}</div>
          )}
          {prescription.diagnosis.icd10Code && (
            <div><strong>ICD-10 Code:</strong> {prescription.diagnosis.icd10Code}</div>
          )}
          {prescription.diagnosis.notes && (
            <div><strong>Notes:</strong> {prescription.diagnosis.notes}</div>
          )}
        </CardContent>
      </Card>

      {/* Symptoms */}
      {prescription.symptoms && prescription.symptoms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {prescription.symptoms.map((symptom: any, index: number) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">{symptom.symptom}</div>
                  <Badge variant="outline">{symptom.severity}</Badge>
                  <div className="text-sm text-muted-foreground">{symptom.duration}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Medications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Medications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {prescription.medications.map((medication: any, index: number) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="font-medium text-lg mb-3">
                {index + 1}. {medication.name}
                {medication.genericName && (
                  <span className="text-sm text-muted-foreground ml-2">
                    ({medication.genericName})
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div><strong>Dosage:</strong> {medication.dosage}</div>
                {medication.strength && <div><strong>Strength:</strong> {medication.strength}</div>}
                <div><strong>Frequency:</strong> {medication.frequency}</div>
                <div><strong>Duration:</strong> {medication.duration}</div>
                <div><strong>Quantity:</strong> {medication.quantity} {medication.unit}</div>
                <div><strong>Timing:</strong> {medication.timing}</div>
                <div><strong>Refills:</strong> {medication.refills}</div>
              </div>
              {medication.instructions && (
                <div className="mt-3">
                  <strong>Instructions:</strong> {medication.instructions}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* General Instructions */}
      {prescription.instructions && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">General Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{prescription.instructions}</p>
          </CardContent>
        </Card>
      )}

      {/* Follow-up */}
      {prescription.followUp && prescription.followUp.required && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Follow-up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Required:</strong> Yes</div>
            {prescription.followUp.suggestedDate && (
              <div><strong>Suggested Date:</strong> {new Date(prescription.followUp.suggestedDate).toLocaleDateString()}</div>
            )}
            {prescription.followUp.reason && (
              <div><strong>Reason:</strong> {prescription.followUp.reason}</div>
            )}
            {prescription.followUp.notes && (
              <div><strong>Notes:</strong> {prescription.followUp.notes}</div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print Prescription
        </Button>
        <Button onClick={onPrint}>
          <Download className="h-4 w-4 mr-2" />
          Mark as Printed
        </Button>
      </div>
    </div>
  );
};

export default PrescriptionView;
