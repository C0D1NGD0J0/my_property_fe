import Toggle from "@components/FormElements/Toggle";
import Form from "@components/FormElements/Form";
import Table from "@components/FormElements/Table";
// import Select from "@components/FormElements/Select";
import Button from "@components/FormElements/Button";
import Checkbox from "@components/FormElements/Checkbox";
import FormInput from "@components/FormElements/FormInput";
import FormLabel from "@components/FormElements/FormLabel";
import FormField from "@components/FormElements/FormField";
import FileInput from "@components/FormElements/FileInput";
import dynamic from "next/dynamic";

const Select = dynamic(
  () => import("@components/FormElements/Select"),
  { ssr: false }, // <-- not including this component on server-side
);

const TextEditor = dynamic(
  () => import("@components/TextEditor"),
  { ssr: false }, // <-- not including this component on server-side
);

export {
  Form,
  Select,
  Button,
  Checkbox,
  FormInput,
  FormLabel,
  FormField,
  Table,
  Toggle,
  TextEditor,
  FileInput,
};
