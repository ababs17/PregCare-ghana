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
      emergency_contacts: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: string
          is_primary: boolean | null
          name: string
          phone: string
          priority: number | null
          relationship: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_primary?: boolean | null
          name: string
          phone: string
          priority?: number | null
          relationship: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_primary?: boolean | null
          name?: string
          phone?: string
          priority?: number | null
          relationship?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      healthcare_facilities: {
        Row: {
          address: string
          created_at: string
          email: string | null
          emergency_phone: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          operating_hours: Json | null
          phone: string | null
          rating: number | null
          services: string[] | null
          type: string
          updated_at: string
          verified: boolean | null
        }
        Insert: {
          address: string
          created_at?: string
          email?: string | null
          emergency_phone?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          operating_hours?: Json | null
          phone?: string | null
          rating?: number | null
          services?: string[] | null
          type: string
          updated_at?: string
          verified?: boolean | null
        }
        Update: {
          address?: string
          created_at?: string
          email?: string | null
          emergency_phone?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          operating_hours?: Json | null
          phone?: string | null
          rating?: number | null
          services?: string[] | null
          type?: string
          updated_at?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      healthcare_professionals: {
        Row: {
          created_at: string
          email: string | null
          emergency_phone: string | null
          facility_id: string | null
          id: string
          is_primary: boolean | null
          license_number: string | null
          name: string
          notes: string | null
          phone: string
          specialization: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          emergency_phone?: string | null
          facility_id?: string | null
          id?: string
          is_primary?: boolean | null
          license_number?: string | null
          name: string
          notes?: string | null
          phone: string
          specialization: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          emergency_phone?: string | null
          facility_id?: string | null
          id?: string
          is_primary?: boolean | null
          license_number?: string | null
          name?: string
          notes?: string | null
          phone?: string
          specialization?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "healthcare_professionals_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "healthcare_facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_logs: {
        Row: {
          alert_id: string
          created_at: string
          delivered_at: string | null
          error_message: string | null
          id: string
          method: string
          recipient_id: string
          recipient_type: string
          sent_at: string | null
          status: string
        }
        Insert: {
          alert_id: string
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          method: string
          recipient_id: string
          recipient_type: string
          sent_at?: string | null
          status?: string
        }
        Update: {
          alert_id?: string
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          method?: string
          recipient_id?: string
          recipient_type?: string
          sent_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "risk_alerts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          created_at: string | null
          email: string | null
          emergency_contact: string | null
          full_name: string | null
          id: string
          location: string | null
          medical_conditions: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact?: string | null
          full_name?: string | null
          id: string
          location?: string | null
          medical_conditions?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          medical_conditions?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      risk_alerts: {
        Row: {
          acknowledged_at: string | null
          alert_type: string
          created_at: string
          data: Json | null
          description: string | null
          id: string
          notifications_sent: boolean | null
          resolved_at: string | null
          severity: string
          title: string
          triggered_at: string
          user_id: string
        }
        Insert: {
          acknowledged_at?: string | null
          alert_type: string
          created_at?: string
          data?: Json | null
          description?: string | null
          id?: string
          notifications_sent?: boolean | null
          resolved_at?: string | null
          severity: string
          title: string
          triggered_at?: string
          user_id: string
        }
        Update: {
          acknowledged_at?: string | null
          alert_type?: string
          created_at?: string
          data?: Json | null
          description?: string | null
          id?: string
          notifications_sent?: boolean | null
          resolved_at?: string | null
          severity?: string
          title?: string
          triggered_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_distance: {
        Args: { lat1: number; lon1: number; lat2: number; lon2: number }
        Returns: number
      }
      get_nearby_facilities: {
        Args: { user_lat: number; user_lon: number; radius_km?: number }
        Returns: {
          id: string
          name: string
          type: string
          address: string
          phone: string
          emergency_phone: string
          services: string[]
          distance_km: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
