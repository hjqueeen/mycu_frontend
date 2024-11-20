export interface FetchDataOptions {
  body?: unknown;
  method?: string;
  params?: FetchDataParams;
}

export interface FetchDataParams {
  exclude_community_id?: string;
  exclude_direct_chats?: boolean;
  exclude_group_id?: string;
  exclude_tool_id?: string;
  folder_id?: string;
  group_id?: string;
  ids?: string[];
  include_me?: boolean;
  link_id?: string;
  not_ids?: string[];
  skip?: number;
  unread?: boolean;
  community_id?: string;
  community_id_member?: string;
  community_id_employee?: string;
  community_id_admin?: string;
  community_id_group?: string;
  community_id_folder?: string;
  community_id_community_link?: string;
  community_id_tool_link?: string;
}

export interface UploadDataOptions extends FetchDataOptions {
  formData?: any;
}
