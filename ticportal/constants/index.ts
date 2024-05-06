import {
    Bell,
    BoxIcon,
    FolderKanbanIcon,
    Gift,
    HelpCircle,
    Keyboard,
    Settings,
    ShieldQuestion,
    Tent,
    Tornado,
    User,
    Users,
    Wrench,
} from "lucide-react";
import {useMemo} from "react";

export const navbarRoutes = () => {
  const routes = useMemo(
    () => [
      {
        name: "Dashboard",
        path: "/",
      },
      {
        name: "Apply",
        path: "/apply",
      },
      {
        name: "FAQ",
        path: "/faq",
      },
      {
        name: "Contact",
        path: "/contact",
      },
    ],
    []
  );

  return routes;
};

export const sidebarRoutes = () => {
  const routes = useMemo(
    () => [
      {
        name: "Dashboard",
        path: "/",
        icon: Tent,
      },
      {
        name: "Stages",
        path: "/stages",
        icon: Tornado,
      },
      {
        name: "Teams",
        path: "/teams",
        icon: Users,
      },
      // {
      //   name: "Community",
      //   path: "/community",
      //   icon: MessageCircle,
      // },
      {
          name: "Manage",
          path: "/manage",
          icon: FolderKanbanIcon
      },
      {
        name: "Registration Fee",
        path: "/pay_registration_fee",
        icon: BoxIcon,
      },
      {
        name: "Contact",
        path: "/contact",
        icon: ShieldQuestion,
      },
      {
        name: "Faq",
        path: "/faq",
        icon: HelpCircle,
      },
    ],
    []
  );

  return routes;
};

export const navbarIcons = () => {
  const routes = useMemo(
    () => [
      {
        name: "notification",
        path: "/notifications",
        icon: Bell,
      },
      {
        name: "userprofile",
        path: "/profile",
        icon: User,
      },
    ],
    []
  );

  return routes;
};

export const socialsIcons = () => {
  const socials = useMemo(
    () => [
      {
        name: "facebook",
        icon: "/icons/facebook.svg",
        path: "#",
      },
      {
        name: "Twitter",
        icon: "/icons/twitter.svg",
        path: "#",
      },
      {
        name: "instagram",
        icon: "/icons/instagram.svg",
        path: "#",
      },
      {
        name: "linkedin",
        icon: "/icons/linkedin.svg",
        path: "#",
      },
    ],
    []
  );

  return socials;
};

export const alertRoutes = () => {
  const routes = useMemo(
    () => [
      {
        name: "Profile",
        icon: User,
        path: "/",
        keys: "P",
      },
      {
        name: "Settings",
        icon: Settings,
        path: "/settings/profile",
        keys: "S",
      },
      {
        name: "Tools",
        icon: Wrench,
        path: "/settings/tools",
        keys: "T",
      },
      {
        name: "Invite Friends",
        icon: Gift,
        path: "/settings/invite",
        keys: "I",
      },
      {
        name: "keyboard Shortcuts",
        icon: Keyboard,
        keys: "K + S",
        path: "",
      },
    ],
    []
  );

  return routes;
};

export const settingsRoute = () => {
  const routes = useMemo(
    () => [
      {
        name: "Profile",
        path: "/settings/profile",
      },
      {
        name: "Inbox",
        path: "/settings/inbox",
      },
      {
        name: "Account",
        path: "/settings/account",
      },
      {
        name: "Invite Friends",
        path: "/settings/invite",
      },
      {
        name: "Notifications",
        path: "/settings/notifications",
      },
    ],
    []
  );

  return routes;
};

export const faqs = () => {
  const frequentlyaskedQuestions = useMemo(
    () => [
      {
        question: "Am I eligigble to apply?",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat consequatur, fugit unde enim dolore placeat voluptatum? Earum aperiam non quibusdam, sit quos voluptatem, numquam beatae, possimus veniam nulla quam sequi?",
      },
      {
        question:
          "I have veriified my email but my apllication doestn't save or submit!",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat consequatur, fugit unde enim dolore placeat voluptatum? Earum aperiam non quibusdam, sit quos voluptatem, numquam beatae, possimus veniam nulla quam sequi?",
      },
      {
        question: "My school is not listed on the application.",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat consequatur, fugit unde enim dolore placeat voluptatum? Earum aperiam non quibusdam, sit quos voluptatem, numquam beatae, possimus veniam nulla quam sequi?",
      },
      {
        question: "I keep encountering ann error and can't submit!",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat consequatur, fugit unde enim dolore placeat voluptatum? Earum aperiam non quibusdam, sit quos voluptatem, numquam beatae, possimus veniam nulla quam sequi?",
      },
    ],
    []
  );

  return frequentlyaskedQuestions;
};

export const someConversations = () => {
  const conversations = useMemo(
    () => [
      {
        name: "Zenith noble",
        lastmessage:
          "testing with the others and the others that are not texteing...",
        path: "657890",
      },
      {
        name: "Zenith others",
        lastmessage:
          "testing with the others and the others that are not texteing...",
        path: "3456789",
      },
      {
        name: "Testings",
        lastmessage:
          "testing with the others and the others that are not texteing...",
        path: "97675",
      },
      {
        name: "New User",
        lastmessage:
          "testing with the others and the others that are not texteing...",
        path: "23456",
      },
      {
        name: "Ahmad Abdul",
        lastmessage:
          "testing with the others and the others that are not texteing...",
        path: "2345609",
      },
    ],
    []
  );

  return conversations;
};

export const useStages = [
  {
    name: "Team Formation (1 month) - January",
  },
  {
    name: "Idea Generation & Validation (2 months) January - February",
  },
  {
    name: "Business Plan Development (2 months) January - February",
  },
  {
    name: "Prototype Development (3 months) January - March",
  },
  {
    name: "Project Submission & Validation (1 month) April",
  },
];

export const allowMessagesFrom = () => {
  const allowType = useMemo(
    () => [
      {
        name: "Everyone",
        desc: "Recommended. If you're not in a team with tem them, the message will go into your Other inbox.",
        type: "everyone",
      },
      {
        name: "Only peers",
        desc: "Only the people in your back team will and admins be able to message you.",
        type: "peers",
      },
      {
        name: "No one",
        desc: "That's ok. No one will be able to message you on TiC except Admins.",
        type: "none",
      },
    ],
    []
  );

  return allowType;
};

export const Fonts = () => {
    const fontsArray = useMemo(() => [
        'Arial',
        'Verdana',
        'Helvetica',
        'Tahoma',
        'Trebuchet MS',
        'Times New Roman',
        'Georgia',
        'Garamond',
        'Courier New',
        'Brush Script MT'
    ], [])

    return fontsArray
}

export const FontSizes = () => {
    return useMemo(() => {
        return [
            8,
            9,
            10,
            11,
            12,
            14,
            16,
            18,
            20,
            24,
            30,
            36,
            48,
            60,
            72,
            96,
        ]
    }, []);
}


export const Headings = () => {
    return useMemo(() => {
        return {
            'heading1': ''
        }
    }, []);
}