import matplotlib.pyplot as plt
import pandas as pd
import io

class ChartGenerator:
    @staticmethod
    def _save_to_bytes(fig):
        buf = io.BytesIO()
        fig.savefig(buf, format="png", bbox_inches="tight", dpi=300)
        buf.seek(0)
        plt.close(fig)
        return buf

    @staticmethod
    def generate_pie_chart(data: dict, title: str):
        fig, ax = plt.subplots(figsize=(6, 6))
        ax.pie(data.values(), labels=data.keys(), autopct="%1.1f%%", startangle=90, colors=plt.cm.Paired.colors)
        ax.set_title(title, fontweight="bold")
        return ChartGenerator._save_to_bytes(fig)

    @staticmethod
    def generate_bar_chart(data: dict, title: str, xlabel: str, ylabel: str):
        fig, ax = plt.subplots(figsize=(8, 5))
        ax.bar(list(data.keys()), list(data.values()), color="#1f77b4")
        ax.set_title(title, fontweight="bold")
        ax.set_xlabel(xlabel)
        ax.set_ylabel(ylabel)
        plt.xticks(rotation=45, ha="right")
        fig.tight_layout()
        return ChartGenerator._save_to_bytes(fig)

    @staticmethod
    def generate_horizontal_bar_chart(data: dict, title: str, xlabel: str, ylabel: str):
        fig, ax = plt.subplots(figsize=(8, 5))
        ax.barh(list(data.keys()), list(data.values()), color="#2ca02c")
        ax.set_title(title, fontweight="bold")
        ax.set_xlabel(xlabel)
        ax.set_ylabel(ylabel)
        fig.tight_layout()
        return ChartGenerator._save_to_bytes(fig)

    @staticmethod
    def generate_line_chart(data: dict, title: str, xlabel: str, ylabel: str):
        fig, ax = plt.subplots(figsize=(8, 5))
        ax.plot(list(data.keys()), list(data.values()), marker="o", linestyle="-", color="#d62728", linewidth=2)
        ax.set_title(title, fontweight="bold")
        ax.set_xlabel(xlabel)
        ax.set_ylabel(ylabel)
        ax.grid(True, linestyle="--", alpha=0.7)
        fig.tight_layout()
        return ChartGenerator._save_to_bytes(fig)
