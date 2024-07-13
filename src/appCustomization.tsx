import React, { useState } from 'react';
import { AppConfig, TabConfig, ChartConfig } from './config';
import { Home, BarChart2, Settings, Users, Calendar, Phone, FileText, Clock, Mail } from 'lucide-react';

type CustomComponentProps = {
  config: AppConfig;
};

interface CustomComponents {
  [key: string]: React.FC<CustomComponentProps>;
}

interface CustomData {
  [key: string]: any;
}

// =============== CUSTOM COMPONENTS ===============
const PropertyOccupationComponent: React.FC<CustomComponentProps> = ({ config }) => {
  const [properties, setProperties] = useState([
    { id: 1, name: 'Shopping Center A', status: 'Vacant', nextAction: 'Occupy', dueDate: '2023-09-15' },
    { id: 2, name: 'Retail Space B', status: 'Occupied', nextAction: 'Vacate', dueDate: '2023-10-01' },
    { id: 3, name: 'Office Building C', status: 'Vacant', nextAction: 'Occupy', dueDate: '2023-09-30' },
  ]);

  const handleActionClick = (id: number) => {
    setProperties(properties.map(prop => {
      if (prop.id === id) {
        const newStatus = prop.status === 'Vacant' ? 'Occupied' : 'Vacant';
        const newAction = newStatus === 'Vacant' ? 'Occupy' : 'Vacate';
        const newDueDate = new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0];
        return { ...prop, status: newStatus, nextAction: newAction, dueDate: newDueDate };
      }
      return prop;
    }));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Property Occupation Management</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Property</th>
            <th>Status</th>
            <th>Next Action</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(prop => (
            <tr key={prop.id}>
              <td>{prop.name}</td>
              <td>{prop.status}</td>
              <td>{prop.nextAction}</td>
              <td>{prop.dueDate}</td>
              <td>
                <button 
                  onClick={() => handleActionClick(prop.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {prop.nextAction}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const InvoiceProcessingComponent: React.FC<CustomComponentProps> = ({ config }) => {
  const [invoices, setInvoices] = useState([
    { id: 1, property: 'Property A', amount: 5000, status: 'Pending', dueDate: '2023-09-30' },
    { id: 2, property: 'Property B', amount: 7500, status: 'Paid', dueDate: '2023-09-15' },
    { id: 3, property: 'Property C', amount: 6000, status: 'Overdue', dueDate: '2023-09-01' },
  ]);

  const handleStatusChange = (id: number, newStatus: string) => {
    setInvoices(invoices.map(inv => 
      inv.id === id ? { ...inv, status: newStatus } : inv
    ));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Invoice Processing</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Property</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.property}</td>
              <td>£{inv.amount}</td>
              <td>{inv.status}</td>
              <td>{inv.dueDate}</td>
              <td>
                <select 
                  value={inv.status} 
                  onChange={(e) => handleStatusChange(inv.id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// =============== CONFIGURATION ===============
const customConfig: AppConfig = {
  title: "QuoinStone Property Management",
  companyName: "QuoinStone Group",
  logo: "/path/to/quoinstone-logo.png",
  primaryColor: "#4F46E5",
  secondaryColor: "#818CF8",
  userName: "Tim Struth",
  dashboard: {
    tabs: [
      {
        id: "propertyOccupation",
        label: "Property Occupation",
        description: "Manage property occupation cycles",
        icon: Home
      },
      {
        id: "invoiceProcessing",
        label: "Invoice Processing",
        description: "Process and track invoices",
        icon: FileText
      },
    ] as TabConfig[],
    charts: {
      propertyStatus: {
        type: "pie",
        dataKeys: ["value"],
        colors: ["#4F46E5", "#818CF8"],
        data: [
          { name: 'Occupied', value: 60 },
          { name: 'Vacant', value: 40 },
        ]
      },
      invoiceStatus: {
        type: "bar",
        dataKeys: ["count"],
        colors: ["#4F46E5"],
        data: [
          { name: 'Pending', count: 10 },
          { name: 'Paid', count: 15 },
          { name: 'Overdue', count: 5 },
        ]
      },
    }
  },
  analytics: {
    charts: {
      occupancyRate: {
        type: "line",
        dataKeys: ["rate"],
        colors: ["#4F46E5"],
        data: [
          { month: 'Jan', rate: 80 },
          { month: 'Feb', rate: 85 },
          { month: 'Mar', rate: 82 },
          { month: 'Apr', rate: 88 },
        ]
      },
      invoiceProcessingTime: {
        type: "bar",
        dataKeys: ["days"],
        colors: ["#818CF8"],
        data: [
          { month: 'Jan', days: 5 },
          { month: 'Feb', days: 4 },
          { month: 'Mar', days: 3 },
          { month: 'Apr', days: 3 },
        ]
      },
    }
  },
  clients: [
    { id: "client1", name: "Major Retail Chain", industry: "Retail" },
    { id: "client2", name: "Office Space Inc", industry: "Commercial Real Estate" },
    { id: "client3", name: "Shopping Mall Group", industry: "Retail" },
  ],
  features: {
    propertyManagement: true,
    invoiceProcessing: true,
    occupancyTracking: true,
    reportGeneration: true
  }
};

// =============== CUSTOM COMPONENTS MAPPING ===============
const customComponents: CustomComponents = {
  propertyOccupation: PropertyOccupationComponent,
  invoiceProcessing: InvoiceProcessingComponent,
};

// =============== CUSTOM DATA ===============
const customData: CustomData = {
  propertyTypes: ['Retail', 'Office', 'Shopping Center', 'Warehouse'],
  invoiceStatuses: ['Pending', 'Paid', 'Overdue'],
  occupancyStatuses: ['Vacant', 'Occupied'],
};

// =============== EXPORT ===============
export const customization = {
  config: customConfig,
  components: customComponents,
  data: customData,
};