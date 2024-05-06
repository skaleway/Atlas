
// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
//   FormLabel,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { emailSchema, passwordSchema } from "@/lib/validations";
// import { useSignIn } from "@clerk/nextjs";
// import { toast } from "sonner";
// import { User } from "@prisma/client";

// const EmailForm = ({ userData }: { userData: User }) => {
//   const form = useForm<z.infer<typeof emailSchema>>({
//     resolver: zodResolver(emailSchema),
//   });

//   const { isLoaded, signIn, setActive } = useSignIn();

//   const {
//     formState: { isSubmitting },
//   } = form;

//   async function handleChangeEmail(data: z.infer<typeof emailSchema>) {
//     if (!isLoaded) {
//       return null;
//     }
//   }

//   async function handleChangePassword(data: z.infer<typeof passwordSchema>) {
//     if (!isLoaded) {
//       return null;
//     }
//   }

//   return (
//     <div className="h-full w-full">
//       <p className="text_sm mb-8">Your information</p>
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(handleChangeEmail)}
//           className="w-full flexcol gap-4"
//         >
//           <div>
//             <p className="mb-5">Change email</p>
//             <div className="flexcol gap-3">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Current email</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder={userData.email}
//                         className="resize-none cursor-not-allowed opacity-50"
//                         // disabled={isSubmitting}
//                         {...field}
//                         value={userData.email}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>New email</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder={userData.email}
//                         className="resize-none cursor-not-allowed opacity-50"
//                         // disabled={isSubmitting}
//                         {...field}
//                         value={userData.email}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>
//           <div className="flex-between">
//             <Button
//               type="submit"
//               disabled={isSubmitting}
//               className="bg-zinc-500 text-white py-2 px-4 rounded hover:bg-zinc-600 w-full"
//             >
//               Sign in
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default EmailForm;
// function Todos() {
//   const { status, data, error } = useQuery({
//     queryKey: ["todos"],
//     queryFn: fetchTodoList,
//   });

//   if (status === "pending") {
//     return <span>Loading...</span>;
//   }

//   if (status === "error") {
//     return <span>Error: {error.message}</span>;
//   }

//   // also status === 'success', but "else" logic works, too
//   return (
//     <ul>
//       {data.map((todo) => (
//         <li key={todo.id}>{todo.title}</li>
//       ))}
//     </ul>
//   );
// }


// const body =
//   '<p>The object-Oriented Paradigm is a style of programming in which everything is considered to be an object.<br>\nAn object here is an instance of a class that holds data and methods to mutate/modify the data held by the object and hence, the object\'s state.</p>\n\n<p>Before we begin to take a deep look, let us understand some terms related to this paradigm.</p>\n\n<h2>\n  <a name="classes-and-objects" href="#classes-and-objects">\n  </a>\n  Classes and Objects\n</h2>\n\n<p>You can think of a <em>class</em> as a general view of a group of items.</p>\n\n<p>An item belonging to a group is considered an <em>object</em>. An object is an instance of a class i.e a specific implementation.</p>\n\n<p>Each group of items has something peculiar about them.</p>\n\n<p>For example, consider <em>Fruits</em>.<br>\nWe know every fruit will have a <em>taste</em>, <em>color</em>, <em>shape</em>, etc. We then have pineapples, watermelon which is all<br>\nspecific examples of fruits.<br>\nYou can think of <em>Fruits</em> as being a general description/blueprint upon which every other fruit builds.<br>\nWatermelon and pineapples could also be seen as objects of the class <em>Fruit</em>.</p>\n\n<p>Every object has a property and attribute. These properties and attributes can be thought of as key-value pairs holding data about<br>\nan object.</p>\n\n<h2>\n  <a name="methods" href="#methods">\n  </a>\n  Methods\n</h2>\n\n<p>Methods are functions that are attached to a class.<br>\nThese sorts of functions can only be called on instances of that class except for <em>static methods</em> which can be called from the class itself.</p>\n\n<p>This paradigm encourages reusability and helps us to group items under a specific type.</p>\n\n<p>In this article, we are going to look at some important concepts in the Object-Oriented paradigm namely;</p>\n\n<ul>\n<li>Abstraction</li>\n<li>Encapsulation</li>\n<li>Inheritance</li>\n<li>Polymorphism</li>\n</ul>\n\n<h1>\n  <a name="data-abstraction" href="#data-abstraction">\n  </a>\n  Data Abstraction\n</h1>\n\n<p>Abstraction is a way of preventing the internal data held by an object from being accessed by some external agent.<br>\nThis means that only methods of that class may access the data held by an object.<br>\nIn languages like <em>Java</em>, this is typically done by adding access specifiers like <code>private</code>, <code>public</code>, or even <code>protected</code>.</p>\n\n<p>Data Abstraction here is a <a href="https://en.wikipedia.org/wiki/Software_design_pattern">design pattern</a>.</p>\n\n<blockquote>\n<p>It is worth noting that even methods can be abstracted in an object preventing direct access.</p>\n</blockquote>\n\n<h1>\n  <a name="encapsulation" href="#encapsulation">\n  </a>\n  Encapsulation\n</h1>\n\n<p>Encapsulation is sometimes confused with Data Abstraction mainly because they are centered around<br>\nhiding stuff from a class. There is some sort of overlap here.</p>\n\n<p>Unlike abstraction, encapsulation is concerned with unifying together data, and the methods that act<br>\non that data under a single unit. This is usually to hide the way data is structured in the class.</p>\n\n<p>This means that the internal structure of data as described by the class might change but the user of the class<br>\nneed not be concerned by those changes as long as the method exposed by that class does the same operation.</p>\n\n<p>Encapsulation is applied to restrict the direct access to object data.</p>\n\n<h1>\n  <a name="inheritance" href="#inheritance">\n  </a>\n  Inheritance\n</h1>\n\n<p>This involves a class inheriting from another class.</p>\n\n<p>Let\'s consider the <em>Fruit</em> class we described above.<br>\nWe might have a higher class named <code>LivingThing</code> from which our Fruit will extend.</p>\n\n<p>A living thing can <em>grow</em>, <em>eat</em> and eventually die. Our fruit class, inheriting from the <code>LivingThing</code> class<br>\nwill therefore also be able to <em>grow</em> &amp; <em>eat</em>.</p>\n\n<p>In this context, we say <code>LivingThing</code> is a <em>super class</em> or <em>parent class</em> of <code>Fruit</code> while <code>Fruit</code> in itself is a <em>child class</em> of <code>LivingThing</code>.</p>\n\n<h1>\n  <a name="polymorphism" href="#polymorphism">\n  </a>\n  Polymorphism\n</h1>\n\n<p>Polymorphism refers to providing a single generic view for objects of different types.<br>\nThis generic view is typically referred to as an <a href="https://en.wikipedia.org/wiki/Interface_(computing)">interface</a>.</p>\n\n<p>Looking at our <code>Fruit</code> example again, we know mangoes and watermelons both grow differently - but one thing is that they will both have a <code>grow()</code> method attached to them.</p>\n\n<p>This mechanism applies even during inheritance.<br>\nThis means that this <code>grow()</code> method may have been inherited from the <code>LivingThing</code> class even though it has different implementations.</p>\n\n<p>You have reached the end. If you want to learn about other design patterns, then consider <a href="https://dev.to/josiasaurel/programming-paradigms-2f25">this article</a>.</p>\n\n';

