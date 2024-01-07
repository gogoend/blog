enum FriendSource {
  _UNKNOWN = 0,
}

export enum RelationType {
  BOSS主动发起 = 1,
  牛人主动发起 = 2,
}
enum GoldGeekStatus {
  WITHOUT = 0,
  WITH = 1,
}
export enum LastMsgStatus {
  BOSS_MESSAGE_OR_SYSTEM_MESSAGE = 0,
  HAS_NOT_READ = 1,
  HAS_READ = 2,
  HAS_REVOKE = 3
}
enum TipType {
  EMPTY = 0,
}

export interface ChatListItem {
  name: string;
  avatar: string;
  encryptBossId: string;
  securityId: string;
  encryptJobId: string;
  brandName: string;
  friendSource: number; // enum
  friendId: number;
  uniqueId: `${ChatListItem["friendId"]}-${number}`;
  isTop: number; // enum
  isFiltered: boolean;
  relationType: RelationType; //enum
  sourceTitle: string;
  goldGeekStatus: GoldGeekStatus; // enum
  lastText: string;
  lastMessageId: string;
  unreadCount: number;
  lastMsgStatus: LastMsgStatus;
  lastTS: number;
  updateTime: number;
  filterReasonList: null | unknown;
  title: string;
  tipType: TipType;
  lastIsSelf: boolean;
}
