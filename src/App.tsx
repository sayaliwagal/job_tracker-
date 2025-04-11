import { JobForm } from "./components/JobForm";
import { JobList } from "./components/JobList";

export default function App() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Student Job Tracker
      </h1>
      <JobForm />
      <JobList />
    </div>
  );
}
