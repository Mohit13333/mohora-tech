import React, { useState, useRef } from 'react';
import { Download, Printer, Send, Plus, Trash2, Mail, Loader2 } from 'lucide-react';

const InvoiceGenerator = () => {
  const printRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');
  const [invoice, setInvoice] = useState({
    invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
    companyName: 'MOHORA TECHNOLOGIES PVT LTD',
    companyAddress: 'Office No. 123, Business Plaza\nAndheri East, Mumbai - 400069\nMaharashtra, India\nPhone: +91 98765 43210',
    companyEmail: 'accounts@mohoratech.com',
    companyWebsite: 'www.mohoratech.com',
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    items: [
      { description: 'Web Development Service', quantity: 1, price: 25000, total: 25000 }
    ],
    notes: 'Thank you for choosing Mohora Technologies for your digital needs.',
    terms: 'Payment due within 30 days of invoice date.\nLate payments are subject to 1.5% monthly interest charge.'
  });

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, price: 0, total: 0 }]
    }));
  };

  const removeItem = (index) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index, field, value) => {
    setInvoice(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      
      if (field === 'quantity' || field === 'price') {
        newItems[index].total = newItems[index].quantity * newItems[index].price;
      }
      
      return { ...prev, items: newItems };
    });
  };

  const updateInvoice = (field, value) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  };

  const calculateSubtotal = () => {
    return invoice.items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const generatePDFContent = () => {
    const element = printRef.current;
    return {
      html: element.innerHTML,
      invoiceData: {
        ...invoice,
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        total: calculateTotal()
      }
    };
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      setIsLoading(true);
      const pdfData = generatePDFContent();
      
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pdfData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setEmailStatus('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setEmailStatus('Error downloading PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!invoice.clientEmail) {
      setEmailStatus('Please enter client email address');
      return;
    }

    try {
      setIsLoading(true);
      setEmailStatus('Generating PDF and sending email...');
      
      const pdfData = generatePDFContent();
      
      const emailData = {
        ...pdfData,
        to: invoice.clientEmail,
        from: invoice.companyEmail,
        subject: `Invoice ${invoice.invoiceNumber} from ${invoice.companyName}`,
        message: `Dear ${invoice.clientName},\n\nPlease find attached invoice ${invoice.invoiceNumber} in the amount of $${calculateTotal().toFixed(2)}.\n\nThank you for your business!\n\nBest regards,\n${invoice.companyName}`
      };

      const response = await fetch('/api/send-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      setEmailStatus('Invoice sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailStatus('Error sending email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl animate-pulse-slow-delay"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Invoice Generator
            </span>
          </h1>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="group relative px-3 py-2 sm:px-8 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden text-sm sm:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                <Printer size={16} /> Print
              </span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="group relative px-3 py-2 sm:px-8 sm:py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden disabled:opacity-50 text-sm sm:text-base"
              disabled={isLoading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                Download
              </span>
            </button>
            <button
              onClick={handleSendEmail}
              className="group relative px-3 py-2 sm:px-8 sm:py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden disabled:opacity-50 text-sm sm:text-base"
              disabled={isLoading || !invoice.clientEmail}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
                Send
              </span>
            </button>
          </div>
        </div>

        {/* Status Message */}
        {emailStatus && (
          <div className={`mb-6 p-3 sm:p-4 rounded-lg backdrop-blur-sm ${
            emailStatus.includes('Error') ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
          } text-sm sm:text-base`}>
            {emailStatus}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Input Form */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 sm:p-6 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">Invoice Details</h2>
            
            {/* Company Info */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-medium text-slate-300 mb-3">Company Information</h3>
              <div className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  value={invoice.companyName}
                  onChange={(e) => updateInvoice('companyName', e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 sm:px-8 sm:py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm sm:text-base"
                />
                <textarea
                  value={invoice.companyAddress}
                  onChange={(e) => updateInvoice('companyAddress', e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 sm:px-8 sm:py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-20 sm:h-24 resize-none text-sm sm:text-base"
                />
                <input
                  type="email"
                  value={invoice.companyEmail}
                  onChange={(e) => updateInvoice('companyEmail', e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 sm:px-8 sm:py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Invoice Info */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-medium text-slate-300 mb-3">Invoice Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="text"
                  value={invoice.invoiceNumber}
                  onChange={(e) => updateInvoice('invoiceNumber', e.target.value)}
                  className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 sm:px-8 sm:py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm sm:text-base"
                />
                <input
                  type="date"
                  value={invoice.date}
                  onChange={(e) => updateInvoice('date', e.target.value)}
                  className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 sm:px-8 sm:py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm sm:text-base"
                />
                <input
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => updateInvoice('dueDate', e.target.value)}
                  className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 sm:px-8 sm:py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Client Info */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-medium text-slate-300 mb-3">Client Information</h3>
              <div className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  placeholder="Client Name"
                  value={invoice.clientName}
                  onChange={(e) => updateInvoice('clientName', e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 sm:px-8 sm:py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm sm:text-base"
                />
                <textarea
                  placeholder="Client Address"
                  value={invoice.clientAddress}
                  onChange={(e) => updateInvoice('clientAddress', e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 sm:px-8 sm:py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-20 sm:h-24 resize-none text-sm sm:text-base"
                />
                <input
                  type="email"
                  placeholder="Client Email *"
                  value={invoice.clientEmail}
                  onChange={(e) => updateInvoice('clientEmail', e.target.value)}
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 sm:px-8 sm:py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            {/* Items */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base sm:text-lg font-medium text-slate-300">Services</h3>
                <button
                  onClick={addItem}
                  className="group relative px-2 py-1 sm:px-3 sm:py-2 bg-gradient-to-r from-blue-600/50 to-purple-600/50 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 overflow-hidden text-sm sm:text-base"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                    <Plus size={14} /> Add Service
                  </span>
                </button>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {invoice.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-1 sm:gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Service Description"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      className="col-span-5 bg-white/5 backdrop-blur-sm border border-white/20 rounded px-2 py-1 sm:px-3 sm:py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs sm:text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                      className="col-span-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded px-2 py-1 sm:px-3 sm:py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs sm:text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={item.price}
                      onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                      className="col-span-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded px-2 py-1 sm:px-3 sm:py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs sm:text-sm"
                    />
                    <div className="col-span-2 bg-white/5 rounded px-2 py-1 sm:px-3 sm:py-2 text-center font-medium text-slate-200 text-xs sm:text-sm">
                      ₹{item.total.toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      className="col-span-1 p-1 sm:p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes and Terms */}
            <div className="space-y-3 sm:space-y-4">
              <textarea
                placeholder="Additional Notes"
                value={invoice.notes}
                onChange={(e) => updateInvoice('notes', e.target.value)}
                className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 sm:px-8 sm:py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-16 sm:h-20 resize-none text-sm sm:text-base"
              />
              <textarea
                placeholder="Terms and Conditions"
                value={invoice.terms}
                onChange={(e) => updateInvoice('terms', e.target.value)}
                className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 sm:px-8 sm:py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-16 sm:h-20 resize-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Invoice Preview */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div ref={printRef} className="invoice-content p-4 sm:p-6 md:p-8">
              {/* Header with Logo */}
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <img 
                      src="https://res.cloudinary.com/mohitsingh8954/image/upload/v1738087360/Figma_basics_1_dnzwnz.svg" 
                      alt="Mohora Technologies Logo"
                      className="w-8 sm:w-12 h-8 sm:h-12"
                    />
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{invoice.companyName}</h1>
                    <div className="text-gray-600 text-xs sm:text-sm whitespace-pre-line">
                      {invoice.companyAddress}
                      {invoice.companyEmail && <>{invoice.companyEmail}<br /></>}
                      {invoice.companyWebsite && <>{invoice.companyWebsite}<br /></>}
                    </div>
                  </div>
                </div>
                <div className="sm:text-right">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">INVOICE</h2>
                  <div className="text-xs sm:text-sm text-gray-600">
                    <div className="font-medium">Invoice #: {invoice.invoiceNumber}</div>
                    <div>Date: {new Date(invoice.date).toLocaleDateString('en-IN')}</div>
                    <div>Due: {new Date(invoice.dueDate).toLocaleDateString('en-IN')}</div>
                  </div>
                </div>
              </div>

              {/* Bill To */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Bill To:</h3>
                <div className="text-gray-700 text-sm sm:text-base">
                  <div className="font-medium">{invoice.clientName || '[Client Name]'}</div>
                  <div className="whitespace-pre-line">{invoice.clientAddress || '[Client Address]'}</div>
                  {invoice.clientEmail && <div>{invoice.clientEmail}</div>}
                </div>
              </div>

              {/* Services Table */}
              <div className="mb-6 sm:mb-8 overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-2 sm:p-3 font-semibold text-gray-800 text-xs sm:text-sm">Service Description</th>
                      <th className="text-center p-2 sm:p-3 font-semibold text-gray-800 text-xs sm:text-sm">Qty</th>
                      <th className="text-right p-2 sm:p-3 font-semibold text-gray-800 text-xs sm:text-sm">Price (₹)</th>
                      <th className="text-right p-2 sm:p-3 font-semibold text-gray-800 text-xs sm:text-sm">Total (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="p-2 sm:p-3 text-gray-700 text-xs sm:text-sm">{item.description || '[Service Description]'}</td>
                        <td className="p-2 sm:p-3 text-center text-gray-700 text-xs sm:text-sm">{item.quantity}</td>
                        <td className="p-2 sm:p-3 text-right text-gray-700 text-xs sm:text-sm">{item.price.toFixed(2)}</td>
                        <td className="p-2 sm:p-3 text-right text-gray-700 text-xs sm:text-sm">{item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-6 sm:mb-8">
                <div className="w-full sm:w-64">
                  <div className="flex justify-between py-1 sm:py-2">
                    <span className="text-gray-700 text-sm sm:text-base">Subtotal:</span>
                    <span className="text-gray-700 text-sm sm:text-base">₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 sm:py-2">
                    <span className="text-gray-700 text-sm sm:text-base">GST (18%):</span>
                    <span className="text-gray-700 text-sm sm:text-base">₹{(calculateSubtotal() * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 sm:py-3 border-t-2 border-gray-200">
                    <span className="text-lg sm:text-xl font-bold text-gray-800">Total:</span>
                    <span className="text-lg sm:text-xl font-bold text-blue-600">₹{(calculateSubtotal() * 1.18).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Notes and Terms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Notes:</h3>
                  <p className="text-gray-700 text-xs sm:text-sm whitespace-pre-line">
                    {invoice.notes || 'Thank you for choosing Mohora Technologies for your digital needs.'}
                  </p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Terms & Conditions:</h3>
                  <p className="text-gray-700 text-xs sm:text-sm whitespace-pre-line">
                    {invoice.terms || 'Payment due within 30 days of invoice date.\nLate payments are subject to 1.5% monthly interest charge.'}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 sm:mt-12 pt-4 sm:pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
                <p>MOHORA TECHNOLOGIES PVT LTD • GSTIN: 27ABCDE1234F1Z5 • CIN: U72200MH2020PTC123456</p>
                <p className="mt-1">Thank you for your business!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .invoice-content, .invoice-content * {
            visibility: visible;
          }
          .invoice-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            background: white;
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slow-delay {
          animation: pulse-slow 4s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
};

export default InvoiceGenerator;