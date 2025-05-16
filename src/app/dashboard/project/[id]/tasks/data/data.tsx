import {
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
  SignalLow,
  SignalMedium,
  SignalHigh,
} from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
  {
    value: "hotfix",
    label: "Hotfix",
  },
  {
    value: "refactor",
    label: "Refactor",
  },
  {
    value: "design",
    label: "Design",
  },
  {
    value: "test",
    label: "Test",
  },
  {
    value: "integration",
    label: "Integration",
  },
  {
    value: "support",
    label: "Support",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in-progress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleOff,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: SignalLow,
  },
  {
    label: "Medium",
    value: "medium",
    icon: SignalMedium,
  },
  {
    label: "High",
    value: "high",
    icon: SignalHigh,
  },
];
