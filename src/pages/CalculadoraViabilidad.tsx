import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ExpenseRow from "@/components/calculadora/ExpenseRow";
import { FileDown, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import logoImage from "@/assets/Logotipo.png";

interface Expense {
  id: string;
  name: string;
  amount: number;
}

interface PropertyData {
  accountHolder: string;
  address: string;
  fileNumber: string;
  neighborhood: string;
}

const INITIAL_EXPENSES: Expense[] = [
  { id: "hipoteca", name: "Compra / Hipoteca", amount: 0 },
  { id: "remodelacion", name: "Remodelación", amount: 0 },
  { id: "reembolso", name: "Reembolso Propietario", amount: 0 },
  { id: "gestion", name: "Gestión de Crédito", amount: 0 },
  { id: "predial", name: "Predial", amount: 0 },
  { id: "agua", name: "Agua", amount: 0 },
  { id: "luz", name: "Electricidad", amount: 0 },
  { id: "avaluo", name: "Avalúo / Planos", amount: 0 },
  { id: "isr", name: "ISR (Opcional)", amount: 0 },
  { id: "contingencia", name: "Contingencia / Otros", amount: 0 },
];

const CalculadoraViabilidad = () => {
  const [salePrice, setSalePrice] = useState<number>(0);
  const [commissionPercentage, setCommissionPercentage] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [propertyData, setPropertyData] = useState<PropertyData>({
    accountHolder: "",
    address: "",
    fileNumber: "",
    neighborhood: "",
  });
  const [aiInsight, setAiInsight] = useState<string>("");
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);

  const updateExpense = (id: string, amount: number) => {
    setExpenses(prev => prev.map(exp => 
      exp.id === id ? { ...exp, amount } : exp
    ));
  };

  const calculations = useMemo(() => {
    const baseCalculo = salePrice * (1 - commissionPercentage / 100);
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const superavitDeficit = baseCalculo - totalExpenses;
    const marginBenefit = salePrice > 0 ? (superavitDeficit / salePrice) * 100 : 0;
    const roi = totalExpenses > 0 ? (superavitDeficit / totalExpenses) * 100 : 0;

    const expensesWithPercentage = expenses.map(exp => ({
      ...exp,
      percentage: salePrice > 0 ? (exp.amount / salePrice) * 100 : 0
    }));

    const totalPercentage = salePrice > 0 ? (totalExpenses / salePrice) * 100 : 0;
    
    const hasData = salePrice > 0 && totalExpenses > 0;
    
    let classification: 'pending' | 'excellent' | 'viable' | 'caution' | 'not-viable' = 'pending';
    if (hasData) {
      if (superavitDeficit <= 0) {
        classification = 'not-viable';
      } else if (marginBenefit <= 10) {
        classification = 'caution';
      } else if (marginBenefit <= 20) {
        classification = 'viable';
      } else {
        classification = 'excellent';
      }
    }

    return {
      expensesWithPercentage,
      baseCalculo,
      totalExpenses,
      totalPercentage,
      superavitDeficit,
      marginBenefit,
      roi,
      isViable: superavitDeficit > 0,
      hasData,
      classification
    };
  }, [expenses, salePrice, commissionPercentage]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const generateAIInsight = () => {
    if (!calculations.hasData) {
      return;
    }
    
    setIsGeneratingInsight(true);
    
    setTimeout(() => {
      const { superavitDeficit, marginBenefit, roi, totalExpenses, isViable } = calculations;
      
      let insight = "";
      
      if (isViable) {
        if (marginBenefit > 20) {
          insight = `🎯 Excelente oportunidad de inversión. Con un margen de beneficio del ${marginBenefit.toFixed(2)}% y un ROI del ${roi.toFixed(2)}%, este proyecto presenta un perfil de riesgo-retorno muy favorable. La inversión total de ${formatCurrency(totalExpenses)} generaría una ganancia neta de ${formatCurrency(superavitDeficit)}. Se recomienda proceder con la adquisición, asegurando que los costos de remodelación no excedan el presupuesto establecido.`;
        } else if (marginBenefit > 10) {
          insight = `✅ Proyecto viable con margen moderado. El margen de beneficio del ${marginBenefit.toFixed(2)}% está dentro de parámetros aceptables para flipping inmobiliario. El ROI proyectado de ${roi.toFixed(2)}% es competitivo. Se sugiere negociar el precio de compra para mejorar la rentabilidad y mantener un fondo de contingencia del 5-10% adicional.`;
        } else {
          insight = `⚠️ Proyecto viable pero con margen ajustado. Con un margen del ${marginBenefit.toFixed(2)}%, cualquier imprevisto podría afectar significativamente la rentabilidad. Se recomienda revisar los costos de remodelación, buscar reducir gastos operativos, o negociar mejor precio de compra antes de proceder.`;
        }
      } else {
        insight = `🚫 Proyecto no viable en condiciones actuales. El análisis muestra un déficit de ${formatCurrency(Math.abs(superavitDeficit))}. Para hacer viable este proyecto se necesita: reducir el precio de compra en al menos ${formatCurrency(Math.abs(superavitDeficit) * 1.1)}, o incrementar el precio de venta estimado. Considere renegociar términos o buscar otra propiedad.`;
      }
      
      setAiInsight(insight);
      setIsGeneratingInsight(false);
    }, 1500);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;
    
    const getClassificationColor = () => {
      switch (calculations.classification) {
        case 'excellent': return { r: 34, g: 139, b: 34, bg: [220, 252, 231] };
        case 'viable': return { r: 34, g: 139, b: 34, bg: [220, 252, 231] };
        case 'caution': return { r: 180, g: 120, b: 0, bg: [254, 243, 199] };
        case 'not-viable': return { r: 220, g: 38, b: 38, bg: [254, 226, 226] };
        default: return { r: 100, g: 100, b: 100, bg: [240, 240, 240] };
      }
    };
    
    const getClassificationText = () => {
      switch (calculations.classification) {
        case 'excellent': return 'Excelente';
        case 'viable': return 'Viable';
        case 'caution': return 'Ajustado';
        case 'not-viable': return 'No Viable';
        default: return 'Pendiente';
      }
    };
    
    const colors = getClassificationColor();

    // Header with InmoLeads orange
    doc.setFillColor(242, 97, 32); // #F26120
    doc.rect(0, 0, pageWidth, 25, 'F');
    
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("Análisis de Viabilidad - InmoLeads", pageWidth / 2, 15, { align: "center" });
    
    y = 35;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    const now = new Date();
    doc.text(`Generado el: ${now.toLocaleDateString('es-MX', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`, pageWidth / 2, y, { align: "center" });
    
    doc.setTextColor(0);
    y += 12;

    // Datos Generales Box
    doc.setDrawColor(242, 97, 32);
    doc.setFillColor(255, 247, 243);
    doc.roundedRect(margin, y, pageWidth - 2 * margin, 35, 3, 3, 'FD');
    
    y += 8;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(35, 40, 51); // #232833
    doc.text("Datos Generales", margin + 5, y);
    
    y += 8;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Cuentahabiente: ${propertyData.accountHolder || "No especificado"}`, margin + 5, y);
    doc.text(`Expediente: ${propertyData.fileNumber || "No especificado"}`, pageWidth / 2, y);
    
    y += 6;
    doc.text(`Dirección: ${propertyData.address || "No especificada"}`, margin + 5, y);
    doc.text(`Colonia: ${propertyData.neighborhood || "No especificada"}`, pageWidth / 2, y);
    
    y += 20;

    // Ingresos Section
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(242, 97, 32);
    doc.text("Ingresos", margin, y);
    doc.setTextColor(0);
    y += 7;
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Precio Venta Estimado (PVE)", margin, y);
    doc.text(formatCurrency(salePrice), pageWidth / 2 - 10, y, { align: "right" });
    y += 5;
    doc.text("Comisión por Intermediación (CFI)", margin, y);
    doc.text(`${commissionPercentage}%`, pageWidth / 2 - 10, y, { align: "right" });
    
    y += 12;

    // Gastos Table
    const tableWidth = 95;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(242, 97, 32);
    doc.text("Gastos", margin, y);
    doc.setTextColor(0);
    y += 7;

    // Table Header with InmoLeads orange
    doc.setFillColor(242, 97, 32);
    doc.rect(margin, y - 4, tableWidth, 8, 'F');
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("Concepto", margin + 2, y);
    doc.text("Monto", margin + 65, y, { align: "right" });
    doc.text("% del Total", margin + tableWidth - 2, y, { align: "right" });
    doc.setTextColor(0);
    y += 6;

    // Table Rows
    doc.setFont("helvetica", "normal");
    const startY = y;
    calculations.expensesWithPercentage.forEach((expense, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(255, 247, 243);
        doc.rect(margin, y - 4, tableWidth, 6, 'F');
      }
      
      const isBold = ["hipoteca", "remodelacion", "reembolso"].includes(expense.id);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.setFontSize(7);
      doc.text(expense.name, margin + 2, y);
      doc.text(formatCurrency(expense.amount), margin + 65, y, { align: "right" });
      doc.text(`${expense.percentage.toFixed(2)}%`, margin + tableWidth - 2, y, { align: "right" });
      y += 6;
    });

    // Total de Gastos
    y += 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setFillColor(255, 237, 227);
    doc.rect(margin, y - 4, tableWidth, 7, 'F');
    doc.text("Total de Gastos (TG)", margin + 2, y);
    doc.text(formatCurrency(calculations.totalExpenses), margin + 65, y, { align: "right" });
    doc.setTextColor(242, 97, 32);
    doc.text(`${calculations.totalPercentage.toFixed(2)}%`, margin + tableWidth - 2, y, { align: "right" });
    doc.setTextColor(0);

    // Right side - Resultados Financieros
    const rightX = margin + tableWidth + 5;
    const rightWidth = pageWidth - rightX - margin;
    let rightY = startY - 13;
    
    // Resultados Financieros Box
    doc.setDrawColor(35, 40, 51);
    doc.setFillColor(35, 40, 51);
    doc.roundedRect(rightX, rightY, rightWidth, 52, 3, 3, 'FD');
    
    rightY += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("Resultados Financieros", rightX + 5, rightY);
    
    rightY += 10;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Base de Cálculo (BC)", rightX + 5, rightY);
    doc.text(formatCurrency(calculations.baseCalculo), rightX + rightWidth - 5, rightY, { align: "right" });
    
    rightY += 6;
    doc.text("Total de Gastos (TG)", rightX + 5, rightY);
    doc.text(formatCurrency(calculations.totalExpenses), rightX + rightWidth - 5, rightY, { align: "right" });
    
    // Superávit/Déficit
    rightY += 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Superávit / Déficit", rightX + 5, rightY);
    doc.setTextColor(242, 97, 32);
    doc.text(formatCurrency(calculations.superavitDeficit), rightX + rightWidth - 5, rightY, { align: "right" });
    doc.setTextColor(255, 255, 255);
    
    rightY += 8;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Margen de Beneficio", rightX + 5, rightY);
    doc.text(`${calculations.marginBenefit.toFixed(2)}%`, rightX + rightWidth - 5, rightY, { align: "right" });
    
    rightY += 6;
    doc.text("Retorno de Inversión (ROI)", rightX + 5, rightY);
    doc.text(`${calculations.roi.toFixed(2)}%`, rightX + rightWidth - 5, rightY, { align: "right" });
    doc.setTextColor(0);

    // Clasificación de Viabilidad
    rightY += 10;
    doc.setFillColor(colors.bg[0], colors.bg[1], colors.bg[2]);
    doc.roundedRect(rightX, rightY, rightWidth, 20, 3, 3, 'F');
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Clasificación de Viabilidad", rightX + 5, rightY + 8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(colors.r, colors.g, colors.b);
    doc.text(getClassificationText(), rightX + 5, rightY + 16);
    doc.setTextColor(0);

    // AI Insight
    if (aiInsight) {
      rightY += 25;
      doc.setFillColor(255, 247, 243);
      doc.roundedRect(rightX, rightY, rightWidth, 35, 3, 3, 'FD');
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(242, 97, 32);
      doc.text("Insight IA", rightX + 5, rightY + 8);
      
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0);
      const cleanInsight = aiInsight.replace(/[🎯✅⚠️🚫]/g, '').trim();
      const splitInsight = doc.splitTextToSize(cleanInsight, rightWidth - 10);
      doc.text(splitInsight.slice(0, 5), rightX + 5, rightY + 15);
    }

    // Footer
    doc.setFillColor(35, 40, 51);
    doc.rect(0, 280, pageWidth, 17, 'F');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("inmoleads.pro - Aliados estratégicos en el flipping inmobiliario", pageWidth / 2, 290, { align: "center" });

    // Download
    const fileName = propertyData.fileNumber 
      ? `Viabilidad_${propertyData.fileNumber}.pdf`
      : `Viabilidad_${now.toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="fixed top-4 left-0 right-0 z-50">
        <div className="container mx-auto px-3 md:px-6">
          <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-6 rounded-full border border-border/40 bg-background/95 px-8 py-2 shadow-lg shadow-primary/10 backdrop-blur">
            <Link to="/" className="flex items-center gap-2 text-[#F26120] hover:text-[#F26120]/80 transition-colors font-semibold">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Volver al inicio</span>
            </Link>
            
            <div className="flex shrink-0 items-center justify-center">
              <img
                src={logoImage}
                alt="Inmo Leads"
                className="h-10 w-auto md:h-12"
              />
            </div>

            <div className="text-sm font-semibold text-[#F26120]">
              Calculadora
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-[#232833] mb-2">
              Análisis de Viabilidad de Flipping Inmobiliario
            </h1>
            <p className="text-muted-foreground">
              Calculadora profesional para inversión inmobiliaria
            </p>
          </div>

          {/* Status Banner */}
          <div className={`flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl ${
            calculations.classification === 'pending' ? 'bg-gray-100 border-2 border-gray-300' :
            calculations.classification === 'not-viable' ? 'bg-red-50 border-2 border-red-500' :
            calculations.classification === 'caution' ? 'bg-amber-50 border-2 border-amber-500' :
            'bg-green-50 border-2 border-green-500'
          }`}>
            <span className="text-lg font-semibold text-[#232833]">CLASIFICACIÓN</span>
            <div className="flex items-center gap-4">
              {calculations.classification === 'pending' ? (
                <span className="px-4 py-2 rounded-lg font-bold text-lg bg-gray-200 text-gray-600">
                  PENDIENTE
                </span>
              ) : (
                <>
                  <span className={`px-4 py-2 rounded-lg font-bold text-lg text-white ${
                    calculations.classification === 'not-viable' ? 'bg-red-500' :
                    calculations.classification === 'caution' ? 'bg-amber-500' :
                    'bg-green-500'
                  }`}>
                    {calculations.classification === 'not-viable' ? 'NO VIABLE' :
                     calculations.classification === 'caution' ? 'AJUSTADO' :
                     calculations.classification === 'excellent' ? 'EXCELENTE' : 'VIABLE'}
                  </span>
                  <span className={`text-2xl font-mono font-bold ${
                    calculations.classification === 'not-viable' ? 'text-red-600' :
                    calculations.classification === 'caution' ? 'text-amber-600' :
                    'text-green-600'
                  }`}>
                    {formatCurrency(calculations.superavitDeficit)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Datos Generales */}
          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm animate-slide-up">
            <h2 className="text-lg font-semibold text-[#232833] mb-4 pb-2 border-b border-gray-200">
              Datos Generales
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#232833]">
                    Cuentahabiente
                  </label>
                  <Input
                    type="text"
                    value={propertyData.accountHolder}
                    onChange={(e) => setPropertyData(prev => ({ ...prev, accountHolder: e.target.value }))}
                    placeholder="Nombre completo"
                    className="border-gray-300 focus:border-[#F26120] focus:ring-[#F26120]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#232833]">
                    Dirección
                  </label>
                  <Input
                    type="text"
                    value={propertyData.address}
                    onChange={(e) => setPropertyData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Calle, número, ciudad"
                    className="border-gray-300 focus:border-[#F26120] focus:ring-[#F26120]"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#232833]">
                    Expediente
                  </label>
                  <Input
                    type="text"
                    value={propertyData.fileNumber}
                    onChange={(e) => setPropertyData(prev => ({ ...prev, fileNumber: e.target.value }))}
                    placeholder="EXP-00123"
                    className="border-gray-300 focus:border-[#F26120] focus:ring-[#F26120]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#232833]">
                    Colonia
                  </label>
                  <Input
                    type="text"
                    value={propertyData.neighborhood}
                    onChange={(e) => setPropertyData(prev => ({ ...prev, neighborhood: e.target.value }))}
                    placeholder="Nombre de la colonia"
                    className="border-gray-300 focus:border-[#F26120] focus:ring-[#F26120]"
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Ingresos y Gastos */}
            <div className="lg:col-span-2 space-y-6">
              {/* Ingresos */}
              <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm animate-slide-up">
                <h2 className="text-lg font-semibold text-[#232833] mb-4 pb-2 border-b border-gray-200">
                  Ingresos
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#232833]">
                      Precio Venta Estimado (PVE)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-gray-500">$</span>
                      <Input
                        type="number"
                        value={salePrice || ""}
                        onChange={(e) => setSalePrice(Number(e.target.value) || 0)}
                        className="text-lg font-mono text-right border-gray-300 focus:border-[#F26120] focus:ring-[#F26120]"
                        placeholder="2,000,000"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#232833]">
                      Comisión por Intermediación (CFI)
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={commissionPercentage || ""}
                        onChange={(e) => setCommissionPercentage(Number(e.target.value) || 0)}
                        className="text-lg font-mono text-right border-gray-300 focus:border-[#F26120] focus:ring-[#F26120]"
                        placeholder="5"
                      />
                      <span className="text-lg font-semibold text-gray-500">%</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Gastos Table */}
              <Card className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm animate-slide-up">
                <div className="bg-[#F26120] px-4 py-3">
                  <h2 className="text-lg font-semibold text-white">Gastos</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#232833] text-white">
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          Concepto
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold">
                          Monto
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold">
                          % del Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculations.expensesWithPercentage.map((expense, index) => (
                        <ExpenseRow
                          key={expense.id}
                          name={expense.name}
                          amount={expense.amount}
                          percentage={expense.percentage}
                          onChange={(amount) => updateExpense(expense.id, amount)}
                          isEven={index % 2 === 0}
                        />
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#FFF3ED] border-t-2 border-[#F26120]">
                        <td className="px-4 py-3 font-bold text-[#232833]">
                          Total de Gastos (TG)
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-[#232833]">
                          {formatCurrency(calculations.totalExpenses)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-[#F26120]">
                          {calculations.totalPercentage.toFixed(2)}%
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </Card>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {/* Resultados Financieros */}
              <Card className="p-6 bg-[#232833] text-white rounded-xl shadow-lg animate-slide-up">
                <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
                  Resultados Financieros
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-sm text-white/70">Base de Cálculo (BC)</span>
                    <span className="font-mono font-semibold">
                      {formatCurrency(calculations.baseCalculo)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-sm text-white/70">Total de Gastos (TG)</span>
                    <span className="font-mono font-semibold">
                      {formatCurrency(calculations.totalExpenses)}
                    </span>
                  </div>

                  <div className={`flex justify-between items-center py-3 px-3 rounded-lg ${
                    calculations.classification === 'pending' ? 'bg-white/10' :
                    calculations.classification === 'not-viable' ? 'bg-red-500/30' :
                    calculations.classification === 'caution' ? 'bg-amber-500/30' :
                    'bg-green-500/30'
                  }`}>
                    <span className="font-semibold">Superávit / Déficit</span>
                    <span className={`font-mono font-bold text-lg ${
                      calculations.classification === 'pending' ? 'text-white/50' :
                      calculations.classification === 'not-viable' ? 'text-red-300' :
                      calculations.classification === 'caution' ? 'text-amber-300' :
                      'text-green-300'
                    }`}>
                      {calculations.hasData ? formatCurrency(calculations.superavitDeficit) : '-'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-sm text-white/70">Margen de Beneficio</span>
                    <span className="font-mono font-semibold">
                      {calculations.marginBenefit.toFixed(2)}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-sm text-white/70">Retorno de Inversión (ROI)</span>
                    <span className="font-mono font-semibold">
                      {calculations.roi.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </Card>

              {/* Clasificación de Viabilidad */}
              <Card className={`p-6 rounded-xl animate-slide-up ${
                calculations.classification === 'pending' ? 'bg-gray-100 border-2 border-gray-300' :
                calculations.classification === 'not-viable' ? 'bg-red-50 border-2 border-red-500' :
                calculations.classification === 'caution' ? 'bg-amber-50 border-2 border-amber-500' :
                'bg-green-50 border-2 border-green-500'
              }`}>
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Clasificación de Viabilidad
                </h3>
                <p className={`text-3xl font-bold ${
                  calculations.classification === 'pending' ? 'text-gray-500' :
                  calculations.classification === 'not-viable' ? 'text-red-600' :
                  calculations.classification === 'caution' ? 'text-amber-600' :
                  'text-green-600'
                }`}>
                  {calculations.classification === 'pending' ? 'Pendiente' :
                   calculations.classification === 'not-viable' ? 'No Viable' :
                   calculations.classification === 'caution' ? 'Ajustado' :
                   calculations.classification === 'excellent' ? 'Excelente' : 'Viable'}
                </p>
              </Card>

              {/* AI Insight */}
              <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm animate-slide-up">
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
                  <h3 className="text-lg font-semibold text-[#232833] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#F26120]" />
                    Insight IA
                  </h3>
                  <Button 
                    onClick={generateAIInsight} 
                    disabled={isGeneratingInsight || !calculations.hasData}
                    size="sm"
                    variant="outline"
                    className="border-[#F26120] text-[#F26120] hover:bg-[#F26120] hover:text-white"
                  >
                    {isGeneratingInsight ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Generar"
                    )}
                  </Button>
                </div>
                
                {!calculations.hasData ? (
                  <p className="text-sm text-gray-500 italic">
                    Ingresa el precio de venta y al menos un gasto para generar el análisis.
                  </p>
                ) : aiInsight ? (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {aiInsight}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Haz clic en "Generar" para obtener un análisis con IA.
                  </p>
                )}
              </Card>

              {/* Download PDF Button */}
              <Button 
                onClick={generatePDF} 
                className="w-full py-6 text-lg font-semibold bg-[#F26120] hover:bg-[#F26120]/90 text-white rounded-xl shadow-lg"
                size="lg"
                disabled={!calculations.hasData}
              >
                <FileDown className="w-5 h-5 mr-2" />
                Descargar PDF
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-200">
            Documento generado automáticamente - inmoleads.pro
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraViabilidad;
