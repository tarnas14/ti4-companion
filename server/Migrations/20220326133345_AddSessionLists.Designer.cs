// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Server.Persistence;

namespace Server.Migrations
{
    [DbContext(typeof(SessionContext))]
    [Migration("20220326133345_AddSessionLists")]
    partial class AddSessionLists
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.15")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("SessionSessionList", b =>
                {
                    b.Property<string>("SessionListsId")
                        .HasColumnType("text");

                    b.Property<Guid>("SessionsId")
                        .HasColumnType("uuid");

                    b.HasKey("SessionListsId", "SessionsId");

                    b.HasIndex("SessionsId");

                    b.ToTable("SessionSessionList");
                });

            modelBuilder.Entity("server.Domain.Agenda", b =>
                {
                    b.Property<string>("Slug")
                        .HasColumnType("text");

                    b.Property<int>("Election")
                        .HasColumnType("integer");

                    b.Property<int?>("ExcludedFrom")
                        .HasColumnType("integer");

                    b.Property<int>("GameVersion")
                        .HasColumnType("integer");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.HasKey("Slug");

                    b.ToTable("Agendas");
                });

            modelBuilder.Entity("server.Domain.Exploration", b =>
                {
                    b.Property<string>("Slug")
                        .HasColumnType("text");

                    b.Property<int>("GameVersion")
                        .HasColumnType("integer");

                    b.Property<int>("Influence")
                        .HasColumnType("integer");

                    b.Property<int>("NumberOfCards")
                        .HasColumnType("integer");

                    b.Property<int>("PlanetType")
                        .HasColumnType("integer");

                    b.Property<int>("Resources")
                        .HasColumnType("integer");

                    b.Property<int?>("TechSkip")
                        .HasColumnType("integer");

                    b.HasKey("Slug");

                    b.ToTable("Explorations");
                });

            modelBuilder.Entity("server.Domain.GameEvent", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("EventType")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("HappenedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("SerializedPayload")
                        .HasColumnType("text");

                    b.Property<Guid>("SessionId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("SessionId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("server.Domain.Objective", b =>
                {
                    b.Property<string>("Slug")
                        .HasColumnType("text");

                    b.Property<int>("GameVersion")
                        .HasColumnType("integer");

                    b.Property<int>("Points")
                        .HasColumnType("integer");

                    b.Property<int>("Reward")
                        .HasColumnType("integer");

                    b.Property<bool>("Secret")
                        .HasColumnType("boolean");

                    b.Property<int>("When")
                        .HasColumnType("integer");

                    b.HasKey("Slug");

                    b.ToTable("Objectives");
                });

            modelBuilder.Entity("server.Domain.Relic", b =>
                {
                    b.Property<string>("Slug")
                        .HasColumnType("text");

                    b.Property<int>("GameVersion")
                        .HasColumnType("integer");

                    b.HasKey("Slug");

                    b.ToTable("Relics");
                });

            modelBuilder.Entity("server.Domain.Session", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("HashedPassword")
                        .HasColumnType("text");

                    b.Property<bool>("Locked")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("server.Domain.SessionList", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("SessionLists");
                });

            modelBuilder.Entity("server.Domain.Token", b =>
                {
                    b.Property<Guid>("Value")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTimeOffset>("Expires")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("SessionId")
                        .HasColumnType("uuid");

                    b.HasKey("Value");

                    b.ToTable("Tokens");
                });

            modelBuilder.Entity("SessionSessionList", b =>
                {
                    b.HasOne("server.Domain.SessionList", null)
                        .WithMany()
                        .HasForeignKey("SessionListsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Domain.Session", null)
                        .WithMany()
                        .HasForeignKey("SessionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("server.Domain.GameEvent", b =>
                {
                    b.HasOne("server.Domain.Session", null)
                        .WithMany("Events")
                        .HasForeignKey("SessionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("server.Domain.Session", b =>
                {
                    b.Navigation("Events");
                });
#pragma warning restore 612, 618
        }
    }
}
