import { Form } from "react-bootstrap";

export interface SelectCategoryProps {
  category: string;
  handleCategoryChange: any;
  selectCategories: any;
}

const SelectCategory = ({
  category,
  handleCategoryChange,
  selectCategories,
}: SelectCategoryProps) => {
  return (
    <Form.Group className="w-50 me-2" controlId="formBasicSelect">
      <Form.Control
        as="select"
        value={category}
        onChange={handleCategoryChange}
      >
        <option>select</option>
        {selectCategories.map((category: any, index: any) => {
          return (
            <option key={index} value={category.value}>
              {category.label}
            </option>
          );
        })}
      </Form.Control>
    </Form.Group>
  );
};

export default SelectCategory;
