export type LeaderboardUser = {
  rank: number;
  name: string;
  avatar?: string;
  time: string;
  sentences: number;
  points: number;
};

export const leaderboardUsers: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Minh Phương",
    time: "3h 37m",
    sentences: 3436,
    points: 6740,
  },
  {
    rank: 2,
    name: "Bảo Chí Trần An",
    time: "30h 47m",
    sentences: 3196,
    points: 6180,
  },
  {
    rank: 3,
    name: "Liễu Thị Thủy",
    time: "12h 37m",
    sentences: 3120,
    points: 5824,
  },
  {
    rank: 4,
    name: "Trang Thu",
    time: "2h 7m",
    sentences: 2873,
    points: 5699,
  },
  {
    rank: 5,
    name: "Trần Gia Bảo",
    time: "1h 14m",
    sentences: 2652,
    points: 5566,
  },
];
