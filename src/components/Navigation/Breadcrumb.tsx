
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { BreadcrumbItem } from "@/routes";

/**
 * Breadcrumb navigation component for displaying path hierarchy
 * 
 * @param items - Array of breadcrumb items to display
 */
interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex text-sm mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-500 mx-1" />
            )}
            {item.isActive ? (
              <span className="text-gray-400" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
