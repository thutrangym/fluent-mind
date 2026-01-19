export type Comment = {
  id: number;
  name: string;
  content: string;
  time: string;
};

export const comments: Comment[] = [
  {
    id: 1,
    name: "Minh Phương",
    content:
      "Fluent Mind really helps me stay consistent with listening practice!",
    time: "2 hours ago",
  },
  {
    id: 2,
    name: "Trang Thu",
    content:
      "I love the shadowing feature, it makes speaking feel more natural.",
    time: "1 day ago",
  },
  {
    id: 3,
    name: "Huy Đào",
    content:
      "Vocabulary review with spaced repetition is super effective 👍",
    time: "3 days ago",
  },
];
