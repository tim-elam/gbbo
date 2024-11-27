export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      candidates: {
        Row: {
          person_id: string
          race_id: string
        }
        Insert: {
          person_id: string
          race_id: string
        }
        Update: {
          person_id?: string
          race_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidates_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidates_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
        ]
      }
      issues: {
        Row: {
          embedding: string
          id: string
          slug: string
          title: string
        }
        Insert: {
          embedding: string
          id?: string
          slug: string
          title: string
        }
        Update: {
          embedding?: string
          id?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      kysely_migration: {
        Row: {
          name: string
          timestamp: string
        }
        Insert: {
          name: string
          timestamp: string
        }
        Update: {
          name?: string
          timestamp?: string
        }
        Relationships: []
      }
      kysely_migration_lock: {
        Row: {
          id: string
          is_locked: number
        }
        Insert: {
          id: string
          is_locked?: number
        }
        Update: {
          id?: string
          is_locked?: number
        }
        Relationships: []
      }
      people: {
        Row: {
          first_name: string
          id: string
          last_name: string
          slug: string
        }
        Insert: {
          first_name: string
          id?: string
          last_name: string
          slug: string
        }
        Update: {
          first_name?: string
          id?: string
          last_name?: string
          slug?: string
        }
        Relationships: []
      }
      positions: {
        Row: {
          content: string
          id: string
          issue_id: string
          person_id: string
        }
        Insert: {
          content: string
          id?: string
          issue_id: string
          person_id: string
        }
        Update: {
          content?: string
          id?: string
          issue_id?: string
          person_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "positions_issue_id_fkey"
            columns: ["issue_id"]
            isOneToOne: false
            referencedRelation: "issues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "positions_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      races: {
        Row: {
          date: string
          id: string
          slug: string
          title: string
        }
        Insert: {
          date: string
          id?: string
          slug: string
          title: string
        }
        Update: {
          date?: string
          id?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      web_page_chunks: {
        Row: {
          content: string
          embedding: string
          from_line: number
          to_line: number
          web_page_id: string | null
        }
        Insert: {
          content: string
          embedding: string
          from_line: number
          to_line: number
          web_page_id?: string | null
        }
        Update: {
          content?: string
          embedding?: string
          from_line?: number
          to_line?: number
          web_page_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "web_page_chunks_web_page_id_fkey"
            columns: ["web_page_id"]
            isOneToOne: false
            referencedRelation: "web_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      web_pages: {
        Row: {
          content: string | null
          id: string
          pathname: string
          website_origin: string
        }
        Insert: {
          content?: string | null
          id?: string
          pathname: string
          website_origin: string
        }
        Update: {
          content?: string | null
          id?: string
          pathname?: string
          website_origin?: string
        }
        Relationships: [
          {
            foreignKeyName: "web_pages_website_origin_fkey"
            columns: ["website_origin"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["origin"]
          },
        ]
      }
      websites: {
        Row: {
          id: string
          origin: string
          person_id: string
          slug: string
          title: string
        }
        Insert: {
          id?: string
          origin: string
          person_id: string
          slug: string
          title: string
        }
        Update: {
          id?: string
          origin?: string
          person_id?: string
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "websites_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
