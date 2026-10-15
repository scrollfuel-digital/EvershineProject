// src/pages/Admin/adminNavConfig.js
// Configuration-driven navigation structure for the Evershine Admin Panel

export const ADMIN_NAV_CONFIG = [
  {
    id: "users",
    label: "Users",
    iconName: "Users",
    description: "Manage system users, access credentials, role-based permissions, and audit logs.",
    subItems: [
      {
        id: "all-users",
        label: "User List",
        description: "View and administer registered administrator and staff accounts.",
        apiReady: false,
      },
      {
        id: "roles",
        label: "Roles & Permissions",
        description: "Define administrative roles, access control matrices, and permission boundaries.",
        apiReady: false,
      },
      {
        id: "activity",
        label: "Activity Logs",
        description: "Track administrative logins, updates, and audit trails across the platform.",
        apiReady: false,
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    iconName: "Package",
    description: "Product catalogue management, category hierarchies, and filter specifications.",
    subItems: [
      {
        id: "overview",
        label: "Overview",
        description: "Explore catalogue summary metrics, product counts, and cards.",
        apiReady: true,
      },
      {
        id: "catalogue",
        label: "Catalogue",
        description: "Manage categories, types, and variants with cascading filters and edit options.",
        apiReady: true,
      },
      {
        id: "add-product",
        label: "Add Product",
        description: "Create products with hierarchical category, type, and variant attributes.",
        apiReady: true,
      },
      {
        id: "update-delete",
        label: "Update & Delete",
        description: "Update existing products or remove items from the live catalogue.",
        apiReady: true,
      },
      {
        id: "filters",
        label: "Filter Options",
        description: "Manage brands, sub-brands, grades, and sub-grades with active/unavailable status.",
        apiReady: true,
      },
    ],
  },
  {
    id: "contacts",
    label: "Contacts",
    iconName: "Mail",
    description: "Manage customer inquiries, project quote submissions, and contact channels.",
    subItems: [
      {
        id: "inquiries",
        label: "Contact Inquiries",
        description: "Customer inquiries and quote requests submitted via website contact channels.",
        apiReady: false,
      },
      {
        id: "support",
        label: "Support Requests",
        description: "Helpline tickets, assistance queries, and technical consultation requests.",
        apiReady: false,
      },
      {
        id: "settings",
        label: "Contact Details",
        description: "Office location addresses, phone helpline numbers, email addresses, and support hours.",
        apiReady: false,
      },
    ],
  },
  {
    id: "blogs",
    label: "Blogs",
    iconName: "BookOpen",
    description: "Manage technical steel guides, industrial publications, and knowledge articles.",
    subItems: [
      {
        id: "posts",
        label: "All Posts",
        description: "Create, edit, and organize industrial engineering articles and knowledge posts.",
        apiReady: false,
      },
      {
        id: "categories",
        label: "Categories",
        description: "Topical categories for blog entries (e.g. Steel Guide, Roofing & Cladding, PEB).",
        apiReady: false,
      },
      {
        id: "tags",
        label: "Tags",
        description: "Article keyword tags for cataloguing and search indexation.",
        apiReady: false,
      },
      {
        id: "comments",
        label: "Comments",
        description: "Review and moderate reader feedback on published articles.",
        apiReady: false,
      },
    ],
  },
];
