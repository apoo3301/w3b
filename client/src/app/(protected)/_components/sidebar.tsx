// // "use client"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronDown, Home, Users, BarChart2, Settings, Search, Bell, Package } from "lucide-react"
// import { Button } from "~/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "~/components/ui/dropdown-menu"
// import { Input } from "~/components/ui/input"

// interface SidebarProps {
//   open: boolean
//   onClose: () => void
// }

// export default function Sidebar({ open, onClose }: SidebarProps) {
//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
//             onClick={onClose}
//           />
//           <motion.aside
//             initial={{ x: "-100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "-100%" }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-white p-4 shadow-lg md:relative md:translate-x-0"
//           >
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-2 top-2 rounded-full md:hidden"
//               onClick={onClose}
//             >
//               <ChevronDown className="h-6 w-6" />
//             </Button>
//             <div className="mt-8 md:mt-0">
//               <h1 className="mb-6 text-2xl font-bold text-gray-800">Admin Panel</h1>
//               <div className="mb-6">
//                 <Input
//                   type="search"
//                   placeholder="Search..."
//                   className="w-full rounded-full border-gray-300"
//                 />
//               </div>
//               <nav className="space-y-2">
//                 <SidebarItem icon={<Home className="h-5 w-5" />} title="Dashboard" />
//                 <SidebarDropdown icon={<Users className="h-5 w-5" />} title="Users">
//                   <DropdownMenuItem>Manage Users</DropdownMenuItem>
//                   <DropdownMenuItem>Roles & Permissions</DropdownMenuItem>
//                 </SidebarDropdown>
//                 <SidebarDropdown icon={<Package className="h-5 w-5" />} title="Listings">
//                   <DropdownMenuItem>All Listings</DropdownMenuItem>
//                   <DropdownMenuItem>Add New Listing</DropdownMenuItem>
//                   <DropdownMenuItem>Categories</DropdownMenuItem>
//                 </SidebarDropdown>
//                 <SidebarDropdown icon={<BarChart2 className="h-5 w-5" />} title="Analytics">
//                   <DropdownMenuItem>Traffic</DropdownMenuItem>
//                   <DropdownMenuItem>Conversion Rates</DropdownMenuItem>
//                   <DropdownMenuItem>Revenue</DropdownMenuItem>
//                 </SidebarDropdown>
//                 <SidebarItem icon={<Settings className="h-5 w-5" />} title="Settings" />
//               </nav>
//             </div>
//             <div className="absolute bottom-4 left-4 right-4">
//               <Button className="w-full rounded-full bg-gray-800 text-white hover:bg-gray-700">
//                 <Bell className="mr-2 h-4 w-4" />
//                 Notifications
//               </Button>
//             </div>
//           </motion.aside>
//         </>
//       )}
//     </AnimatePresence>
//   )
// }

// function SidebarItem({ icon, title }: { icon: React.ReactNode; title: string }) {
//   return (
//     <Button
//       variant="ghost"
//       className="w-full justify-start rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//     >
//       {icon}
//       <span className="ml-3">{title}</span>
//     </Button>
//   )
// }

// function SidebarDropdown({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="ghost"
//           className="w-full justify-between rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//         >
//           <span className="flex items-center">
//             {icon}
//             <span className="ml-3">{title}</span>
//           </span>
//           <ChevronDown className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56" align="start" side="right">
//         {children}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }