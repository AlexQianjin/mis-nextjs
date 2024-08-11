'use client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
  } from '@/components/ui/breadcrumb';

function getPathSegments(): string[] {
    const router = useRouter();
    const path = router.asPath.split('/').filter(Boolean); // Remove empty strings
    return path;
  }
  
  function transformPathSegmentsToItems(pathSegments: string[]): { name: string; href: string }[] {
    const items = pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const name = segment.replace(/-/g, ' ').replace(/_/g, ' ').charAt(0).toUpperCase() + segment.slice(1);
      return { name, href };
    });
  
    return items;
  }
  
  export default function DashboardBreadcrumb() {
    const pathSegments = getPathSegments();
    const items = transformPathSegmentsToItems(pathSegments);
    console.log(188, items);
    return (
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>All Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }